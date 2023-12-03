import json
import os
import openai
from flask import Flask, jsonify, request, g
from utils import generate_digest_data, generateKeyword, getSourceName
from dummy import DUMMY_DIGEST_SEQUENCE, create_digest_dict, create_episode_dict
import datetime

app = Flask(__name__)

@app.route('/api/generate-digest-podcast', methods=['POST'])
def generate_digest_podcast():
    try:
        data = request.get_json()

        digestName = data.get("digestName")
        digestDescription = data.get("digestDescription")

        results = generate_digest_data(digestName, digestDescription)
        results = results.json

        openai.api_key = os.environ.get("OPENAI_API_KEY")

        prompt = f"You: You are given some data: '{results}'. Take the 3 articles you find the most interesting and write a podcast script based on the knowledge I gave you. Just print the text of the podcast itself.\nAI:"

        response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            temperature=0.7,
            max_tokens=2000
        )

        response_text = response['choices'][0]['text'].strip()
        
        episode_name = "TODO"
        episode_summary = "TODO"
        
        # TODO to text-2-speech here. Input: episode_summary. Output: episode_mp3_path. Save the file under some local folder
        
        # TODO to text-2-img here. Input: title or episode_summary. Output: img path. Save the file under the frontend's public folder --> maybe create a new folder there and put it in the gitignore
    
        
        episode_mp3_path = "TODO"
        episode_img_url = "TODO"
        episode_duration = "TODO"
        
        new_episode = create_episode_dict(
            episode_name,
            episode_summary,
            episode_mp3_path,
            episode_img_url,
            episode_duration,
            datetime.date.today().strftime("%Y-%m-%d"),   # Format is YYYY-MM-DD
            data.get("sources"),
            hasBeenListenedTo=False,
        )
        
        ret = create_digest_dict(
            digestName,
            digestDescription,
            data.get("contentFrequency"),
            data.get("customFrequency"),
            data.get("contentNarrationStyle"),
            data.get("customNarrationStyle"),
            data.get("createdAt"),
            data.get("sources"),
            [new_episode],
        )
        
        return jsonify(ret), 200

    except Exception as e:
        print('Error processing request:', str(e))
        return jsonify({'error': 'Internal Server Error'}), 500
    

@app.route('/api/get-dummy-digest-sequences')
def get_dummy_digest_sequences():
    """Returns some dummy content to populate the user's choices with."""
    try:
        return jsonify(DUMMY_DIGEST_SEQUENCE), 200
    except Exception as e:
        print(f"[get_dummy_digest_sequences] Exception: {e}")
        return {"error": str(e)}, 500


@app.route('/api/get-digest-with-sources', methods=['POST'])
def post_digest_sequence():
    try:
        data = request.get_json()

        # Extract data from the JSON payload
        digestName = data.get("digestName")
        digestDescription = data.get("digestDescription")

        with open("sources.json", "r") as sources_file:
            sources = json.load(sources_file)
            sourceName = getSourceName(digestName, digestDescription)
            sources = list(filter(lambda x: x["name"] == sourceName, sources))
        
        ret = create_digest_dict(
            digestName,
            digestDescription,
            data.get("contentFrequency"),
            data.get("customFrequency"),
            data.get("contentNarrationStyle"),
            data.get("customNarrationStyle"),
            data.get("createdAt"),
            [source["name"] for source in sources], # list of string of names
            data.get("episodes"),
        )

        return jsonify(ret), 200

    except Exception as e:
        print('Error processing request:', str(e))
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/api/generate-digest-content', methods = ['POST'])
def post_sources():
    data = request.get_json()
    digestName = data.get("digestName")
    digestDescription = data.get("digestDescription")
    contentFrequency = data.get("customFrequency") if data.get("customFrequency") is not None and data.get("customFrequency") != "" else data.get("contentFrequency")
    narrationStyle = data.get("customNarrationStyle") if data.get("customNarrationStyle") is not None and data.get("customNarrationStyle") != "" else data.get("narrationStyle")
    sources = data.get("sources")
    customSources = data.get("customSources")

    return {
    'digestName': digestName,
    'digestDescription': digestDescription,
    'contentFrequency': contentFrequency,
    'narrationStyle': narrationStyle,
    'sources': sources,
    'customSources': customSources
    }


@app.route('/api/get-available-sources')
# get prompt of the user
# returns possible sources
def get_available_sources():
    return jsonify([
        {'name': 'wikipedia', 'url': 'https://en.wikipedia.org/'},
        {'name': 'arxive', 'url': 'https://arxiv.org/'}
    ])


if __name__ == '__main__':
    app.run(debug=True, port=4000)
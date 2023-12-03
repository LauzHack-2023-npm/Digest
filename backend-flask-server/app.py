import json
import os
from openai import OpenAI
from flask import Flask, jsonify, request
from utils import generate_digest_data, getSourceName
from dummy import DUMMY_DIGEST_SEQUENCE, create_digest_dict, create_episode_dict
import datetime
from text_to_image import text_to_img
from text_to_speech import text_to_speech
from mutagen.mp3 import MP3


app = Flask(__name__)


@app.route('/api/get-dummy-digest-sequences')
def get_dummy_digest_sequences():
    """Returns some dummy content to populate the user's choices with."""
    try:
        return jsonify(DUMMY_DIGEST_SEQUENCE), 200
    except Exception as e:
        print(f"[get_dummy_digest_sequences] Exception: {e}")
        return {"error": str(e)}, 500
    
    
@app.route('/api/get-available-sources')
# get prompt of the user
# returns possible sources
def get_available_sources():
    return jsonify([
        {'name': 'wikipedia', 'url': 'https://en.wikipedia.org/'},
        {'name': 'arxive', 'url': 'https://arxiv.org/'}
    ])
    

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
    
    
@app.route('/api/generate-digest-content', methods=['POST'])
def generate_digest_content():
    try:
        data = request.get_json()

        digestName = data.get("digestName")
        digestDescription = data.get("digestDescription")
        narrationStyle = data.get("narrationStyle", "scientific")

        results = generate_digest_data(digestName, digestDescription)
        results = results.json

        client = OpenAI()
        # client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
        conversation_prompt = [
            # {"role": "user", "content": f"You: You are given some data: '{results}'. Take the 3 articles you find the most interesting and write a podcast script based on the knowledge I gave you. The style of your answer should be {narrationStyle}. Just print the text of the podcast itself."},
            {"role": "user", "content": f"You: Use this information as a knowledge base: '{results}'. Create a script for a podcast, as scientific overview of the topics, based on the top 3 articles you find the most interesting. It should be done in a {narrationStyle} style. Your answer should be the text of the podcast itself."},
        ]
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=conversation_prompt
        )
        
        text_response = response.choices[0].message.content
        print("text_response:", text_response)
        
        title_prompt = [{"role": "user","content": f"You: Provide me with a title for this podcast script: {text_response}. Your answer should be the title of the podcast script."}]
        summary_prompt = [{"role": "user","content": f"You: Provide me with a summary for this podcast script: {text_response}. Your answer should be the summary of the podcast script."}]

        title_response = client.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=title_prompt,
        )
        
        summary_response = client.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=summary_prompt,
        )
        
        print(title_response)
        print(summary_response)
        
        # print(response)
        # result_json = response.choices[0].message.content
        # result_dict = json.loads(result_json)
        
        episode_name = "TODO"
        episode_summary = "TODO"

        script = "TODO"

        episode_mp3_path = text_to_speech(script)
        episode_img_url = text_to_img("it is a cover for a podcast episode with about this topic: " + episode_summary)
        episode_duration = MP3(episode_mp3_path).info.length  # duration in seconds

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


# @app.route('/api/generate-digest-content', methods = ['POST'])
# def post_sources():
#     data = request.get_json()
#     digestName = data.get("digestName")
#     digestDescription = data.get("digestDescription")
#     contentFrequency = data.get("customFrequency") if data.get("customFrequency") is not None and data.get("customFrequency") != "" else data.get("contentFrequency")
#     narrationStyle = data.get("customNarrationStyle") if data.get("customNarrationStyle") is not None and data.get("customNarrationStyle") != "" else data.get("narrationStyle")
#     sources = data.get("sources")
#     customSources = data.get("customSources")

#     return {
#     'digestName': digestName,
#     'digestDescription': digestDescription,
#     'contentFrequency': contentFrequency,
#     'narrationStyle': narrationStyle,
#     'sources': sources,
#     'customSources': customSources
#     }


if __name__ == '__main__':
    app.run(debug=True, port=4000)
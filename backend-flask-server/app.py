import json
import os
import openai
from flask import Flask, jsonify, request, g
from utils import generate_digest_data, generateKeyword, getSourceName
from dummy import DUMMY_DIGEST_SEQUENCE, create_digest_dict, create_episode_dict

app = Flask(__name__)

@app.route('/api/generate-digest-podcast', methods = ['POST'])
def generate_digest_podcast():
    digestName = request.args.get("digestName")
    digestDescription = request.args.get("digestDescription")

    results = generate_digest_data(digestName, digestDescription)
    results = results.json
    openai.api_key = os.environ.get("OPENAI_API_KEY")
    
    prompt = "You: \
    You are given some data: '{}'. take the 3 article you find the most interesting and write a podcast script, based on the knowledge I gave you. Just print the text of the podcast itself.\
    \nAI:".format(results)
    
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",  # Specify the model
        prompt=prompt,
        temperature=0.7,  # Controls the randomness of the output
        max_tokens=2000  # Limit the length of the response
    )
    response = response['choices'][0]['text'].strip()
    return jsonify(response)
    

@app.route('/api/get-dummy-digest-sequences')
def get_dummy_digest_sequences():
    return jsonify(DUMMY_DIGEST_SEQUENCE)


@app.route('/api/get-digest-with-sources', methods = ['POST'])
def post_digest_sequence():
    digestName = request.args.get("digestName")
    digestDescription = request.args.get("digestDescription")

    # TODO: we need openAI to recommend the sources here!
    sources = [
        {'name': 'wikipedia', 'url': 'https://en.wikipedia.org/'},
        {'name': 'arxive', 'url': 'https://arxiv.org/'}
    ]

    return jsonify(create_digest_dict(
        digestName,
        digestDescription,
        request.args.get("contentFrequency"),
        request.args.get("customFrequency"),
        request.args.get("contentNarrationStyle"),
        request.args.get("customNarrationStyle"),
        request.args.get("createdAt"),
        sources,
        request.args.get("episodes"),  
    ))


@app.route('/api/sources', methods = ['POST'])
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


@app.route('/api/get-source')
# get prompt of the user
# returns possible sources
def get_possible_sources():
    return jsonify([
        {'name': 'wikipedia', 'url': 'https://en.wikipedia.org/'},
        {'name': 'arxive', 'url': 'https://arxiv.org/'}
    ])


if __name__ == '__main__':
    app.run(debug=True)
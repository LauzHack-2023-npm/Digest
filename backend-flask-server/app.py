import json
import os
import openai
from flask import Flask, jsonify, request
from utils import generate_digest_data, generateKeyword, getSourceName

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
    digest_sequences = [
        {"hello": "world1"},
        {"hello": "world2"},
        {"hello": "world3"},
        {"hello": "world4"},
        {"hello": "world5"},
    ]
    return jsonify(digest_sequences)
    
@app.route('/api/digest-sequence', methods = ['POST'])
def post_digest_sequence():
    digestName = request.args.get("digestName")
    digestDescription = request.args.get("digestDescription")
    contentFrequency = request.args.get("customFrequency") if request.args.get("customFrequency") is not None and request.args.get("customFrequency") != "" else request.args.get("contentFrequency")
    narrationStyle = request.args.get("customNarrationStyle") if request.args.get("customNarrationStyle") is not None and request.args.get("customNarrationStyle") != "" else request.args.get("narrationStyle")

    return {
        'name': digestName,
        'description': digestDescription,
        'frequency': contentFrequency,
        'narrationStyle': narrationStyle,
        'sources': [
            {'name': 'wikipedia', 'url': 'https://en.wikipedia.org/'},
            {'name': 'arxive', 'url': 'https://arxiv.org/'}
        ]
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
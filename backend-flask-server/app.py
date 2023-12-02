import os
from flask import Flask, jsonify, request
import openai
from retriever import ArxivRetriever, WikiRetriever
from utils import generateKeyword, getSourceName

app = Flask(__name__)

@app.route('/api/digest', methods = ['POST'])
def post_digest():
    digestName = request.args.get("digestName")
    digestDescription = request.args.get("digestDescription")

    # get source name
    source_name = getSourceName(digestName, digestDescription)
    
    keyword = generateKeyword(digestName, digestDescription)
    print("keyword: ", keyword)
    
    if source_name == "wikipedia":
        # get wikipedia articles
        retriever = WikiRetriever()
        result = retriever.fetch_data(keyword)
        if result['success']:
            data = result['data']
            return jsonify(data)
        else:
            return jsonify({"error": result['error']})
    elif source_name == "arxiv":
        # get arxiv articles
        retriever = ArxivRetriever()
        result = retriever.fetch_data(keyword)
        if result['success']:
            data = result['data']
            return jsonify(data)
        else:
            return jsonify({"error": result['error']})
    else:
        return jsonify({"error": "wrong source name"})
    

### DATA ROUTES ###
@app.route('/api/data/wiki')
def get_wiki_content():
    topic = request.args.get('topic', 'French revolution')
    num_results = int(request.args.get('num_results', 10))
    retriever = WikiRetriever()
    result = retriever.fetch_data(topic, num_results)
    if result['success']:
        data = result['data']
        return jsonify(data)
    else:
        return jsonify({"error": result['error']})

@app.route("/api/data/arxiv")
def get_arxiv_articles():
    topic = request.args.get('topic', 'cs')
    limit = int(request.args.get('limit', 10))

    retriever = ArxivRetriever()
    result = retriever.fetch_data(topic, limit)

    if result['success']:
        data = result['data']
        return jsonify(data)
    else:
        return jsonify({"error": result['error']})
    
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

if __name__ == '__main__':
    app.run(debug=True)
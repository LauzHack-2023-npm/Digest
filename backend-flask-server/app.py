from flask import Flask, jsonify, request
from retriever import ArxivRetriever, WikiRetriever

app = Flask(__name__)

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
    subtopic = request.args.get('subtopic', None)

    retriever = ArxivRetriever()
    result = retriever.fetch_data(topic, subtopic)

    if result['success']:
        data = result['data']
        return jsonify(data)
    else:
        return jsonify({"error": result['error']})

@app.route('/api/digest-sequence', methods = ['POST'])
def post_digest_sequence():
    data = request.get_json()
    digestName = data.get("digestName")
    digestDescription = data.get("digestDescription")
    contentFrequency = data.get("customFrequency") if data.get("customFrequency") is not None and data.get("customFrequency") != "" else data.get("contentFrequency")
    narrationStyle = data.get("customNarrationStyle") if data.get("customNarrationStyle") is not None and data.get("customNarrationStyle") != "" else data.get("narrationStyle")

    # TODO: create real sources recommendations

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
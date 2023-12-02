from flask import Flask, request
from retriever import ArxivRetriever, WikiRetriever
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, Flask!'

@app.route('/api/data/wiki')
def get_wiki_content():
    
    query = request.args.get('query', 'French revolution')
    num_results = int(request.args.get('num_results', 10))
    
    retriever = WikiRetriever()
    result = retriever.fetch_data(query, num_results)
    
    if result['success']:
        text_contents = result['text_contents']
        return jsonify({"texts": text_contents})
    else:
        return jsonify({"error": result['error']})
    
@app.route("/api/data/arxiv")
def get_arxiv_articles():
    topic = request.args.get('topic', 'cs')
    subtopic = request.args.get('subtopic', None)
    
    retriever = ArxivRetriever()
    result = retriever.fetch_data(topic, subtopic)
    
    if result['success']:
        abstracts = result['text_contents']
        return jsonify({"text_contents": abstracts})
    else:
        return jsonify({"error": result['error']})

if __name__ == '__main__':
    app.run(debug=True)
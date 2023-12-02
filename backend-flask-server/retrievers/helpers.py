from flask import jsonify, request
from retrievers.retriever import ArxivRetriever, WikiRetriever

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
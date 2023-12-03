import os
from openai import OpenAI
from typing import Dict, List
from flask import jsonify

from retrievers.retriever import ArxivRetriever, WikiRetriever

# returns the most approptiate sources based on user input
def getSourceName(digestName, digestDescription):
    client = OpenAI()
    conversation_prompt = [
        {
            "role": "user", 
            "content": f"You: You are given a 'digestName' which is '{digestName}' and a 'digestDescription', which is '{digestDescription}'. I have two types of sources on my disposal, wikipedia or arxiv. Depending of what I gave me, answer me if I need to search whether in wikipedia or in arxiv. Your answer should just be 'wikipedia' or 'arxiv'\nAI:"
        },
    ]
    response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",#"gpt-3.5-turbo-16k",
            # temperature=0.7,
            # max_tokens=2000,
            messages=conversation_prompt
        )
    
    client.close()
    
    ai_reply = response.choices[0].message.content.strip().lower()
    
    return ai_reply

def generateKeyword(digestName, digestDescription):
    client = OpenAI()
    conversation_prompt = [
        {
            "role": "user",
            "content": f"You: You are given a 'digestName' which is '{digestName}' and a 'digestDescription', which is '{digestDescription}'. I need you to generate one keyword for me. Your answer should be this keyword\nAI:"
        }
    ]
    response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",#"gpt-3.5-turbo-16k",
            # temperature=0.7,
            # max_tokens=2000,
            messages=conversation_prompt
        )
    
    ai_reply = response.choices[0].message.content.strip().lower()

    return ai_reply

def generate_digest_data(digestName, digestDescription):
    source_name = getSourceName(digestName, digestDescription)
    keyword = generateKeyword(digestName, digestDescription)
    
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


def create_digest_dict(
    digestName: str, 
    digestDescription: str, 
    contentFrequency: str,      # One of ['daily', 'weekly', 'monthly', 'biweekly']
    customFrequency: str,       # dummy; we keep this always as empty: ''
    narrationStyle: str,        # One of ['scientific', 'easyLanguage', 'funMode]
    customNarrationStyle: str,  # dummy; we keep this always as empty: ''
    createdAt: str,             # Format: YYYY-MM-DD 
    sources: List[str],
    episodes: List[Dict[str, str]]
):
    # Info: Add new fields at the end!
    return {
        'digestName': digestName,
        'digestDescription': digestDescription,
        'contentFrequency': contentFrequency,
        'customFrequency': customFrequency,
        'narrationStyle': narrationStyle,
        'customNarrationStyle': customNarrationStyle,
        'createdAt': createdAt,
        'sources': sources,
        'episodes': episodes,
    }
    
    
def create_episode_dict(
    episodeName: str,
    episodeSummary: str,
    episodeMP3path: str,        # Path to the MP3 file in backend
    episodeImageUrl: str,       # URL to the image file in backend
    episodeDuration: str,       # Format: HH:MM:SS
    episodePublishedAt: str,    # Format: YYYY-MM-DD
    episodeSources: List[str],
    hasBeenListenedTo: bool,
):
    # Info: Add new fields at the end!
    return {
        'episodeName': episodeName,
        'episodeDescription': episodeSummary,
        'episodeMP3path': episodeMP3path,
        'episodeImageUrl': episodeImageUrl,
        'episodeDuration': episodeDuration,
        'episodePublishedAt': episodePublishedAt,
        'episodeSources': episodeSources,
        'hasBeenListenedTo': hasBeenListenedTo,
    }
    
    

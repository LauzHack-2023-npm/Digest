import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

from utils import generate_digest_data


def generate_digest_podcast(digestName, digestDescription):

    results = generate_digest_data(digestName, digestDescription)
    results = results.json
    
    prompt = "You: \
    You are given some data: '{}'. take the 3 article you find the most interesting and write a podcast script, based on the knowledge I gave you. Just print the text of the podcast itself.\
    \nAI:".format(results)
    
    response = client.completions.create(model="gpt-3.5-turbo-instruct",  # Specify the model
    prompt=prompt,
    temperature=0.7,  # Controls the randomness of the output
    max_tokens=2000)
    response = response['choices'][0]['text'].strip()
    return response
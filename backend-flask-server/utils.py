import openai
import os

# returns the source name => whether wikipedia or arxiv
def getSourceName(digestName, digestDescription):
    openai.api_key = os.environ.get("OPENAI_API_KEY")
    prompt = "You: You are given a 'digestName' which is '{}' and a 'digestDescription', which is '{}'. I have two types of sources on my disposal, wikipedia or arxiv. Depending of what I gave me, answer me if I need to search whether in wikipedia or in arxiv. Your answer should just be 'wikipedia' or 'arxiv'\nAI:".format(digestName, digestDescription)
    print(prompt)
    response = openai.Completion.create(
        model="text-davinci-003",  # Specify the model
        prompt=prompt,
        temperature=0.7,  # Controls the randomness of the output
        max_tokens=150  # Limit the length of the response
    )
    
    ai_reply = response['choices'][0]['text'].strip().lower()
    
    return ai_reply

def generateKeyword(digestName, digestDescription):
    openai.api_key = os.environ.get("OPENAI_API_KEY")
    prompt = "You: You are given a 'digestName' which is '{}' and a 'digestDescription', which is '{}'. I need you to generate one keyword for me. Your answer should be this keyword\nAI:".format(digestName, digestDescription)
    print(prompt)
    response = openai.Completion.create(
        model="text-davinci-003",  # Specify the model
        prompt=prompt,
        temperature=0.7,  # Controls the randomness of the output
        max_tokens=150  # Limit the length of the response
    )
    
    ai_reply = response['choices'][0]['text'].strip().lower()
    
    return ai_reply
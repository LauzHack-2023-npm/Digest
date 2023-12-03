from pathlib import Path
from openai import OpenAI
import uuid

client = OpenAI()

def text_to_speech(text):
    filename =  "frontend-react-client/public/audio/" + str(uuid.uuid1()) + ".mp3"
    speech_file_path = Path(__file__).parent.parent / filename

    response = client.audio.speech.create(
      model="tts-1",
      voice="alloy",
      input=text
    )

    response.stream_to_file(speech_file_path)

    return str(speech_file_path)
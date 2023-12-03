from openai import OpenAI

client = OpenAI()

def text_to_img(text):

    response = client.images.generate(
      model="dall-e-2",
      prompt=text,
      size="256x256", # smallest size with dall-e-3 is 1024x1024
      quality="standard",
      n=1,
    )

    print(response)
    image_url = response.data[0].url

    return image_url
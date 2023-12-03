from utils import create_digest_dict, create_episode_dict
import json


with open("sources.json", "r") as sources_file:
    all_sources = json.load(sources_file)


DUMMY_DIGEST_SEQUENCE = [
    create_digest_dict(
        "Digest 1",
        "Digest 1 description",
        "daily",
        "",
        "formal",
        "customNarrationStyle",
        "2021-01-01",
        sources=[_["name"] for _ in all_sources], 
        episodes=[
            create_episode_dict(
                "Episode 1",
                "Episode 1 description",
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fe529a64193929.5aca8500ba9ab.jpg",
                "00:00:00",
                "2021-01-01",
                [],
                False,
            ),
            create_episode_dict(
                "Episode 1",
                "Episode 1 description",
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fe529a64193929.5aca8500ba9ab.jpg",
                "00:00:00",
                "2021-01-01",
                [],
                False,
            ),
        ],
    ),
]
from utils import create_digest_dict, create_episode_dict


DUMMY_DIGEST_SEQUENCE = [
    create_digest_dict(
        "Digest 1",
        "Digest 1 description",
        "daily",
        "",
        "formal",
        "customNarrationStyle",
        "2021-01-01",
        [], 
        episodes=[
            create_episode_dict(
                "Episode 1",
                "Episode 1 description",
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                "00:00:00",
                "2021-01-01",
                [],
                False,
            ),
            # TODO
        ],
    ),
]
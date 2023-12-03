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
                "Unveiling the World of Neural Radiance Fields",
                "This podcast delves into the world of Neural Radiance Fields (NeRF) and the cutting-edge research pushing the boundaries of 3D scene reconstruction and view synthesis. It discusses three papers: \"GARF\" introduces an innovative approach to neural radiance fields, \"NeRFMeshing\" addresses 3D mesh generation from neural radiance fields, and \"HDR-NeRF\" presents a method for recovering HDR radiance fields from LDR views. These developments have significant implications for computer graphics, real-time rendering, and a wide range of applications.",
                "/Users/philippwulff/Digest/frontend-react-client/public/audio/ee2eccea-91bd-11ee-b089-ca226dd9b77c.mp3",
                "https://oaidalleapiprodscus.blob.core.windows.net/private/org-bcv27ooZj8JyXgpgj5sed8rH/user-EfI9DxWHLQXE9PEe1KQ50gPO/img-t6aSk6xPnTpPRTYZKSz41589.png?st=2023-12-03T08%3A26%3A18Z&se=2023-12-03T10%3A26%3A18Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-02T19%3A00%3A11Z&ske=2023-12-03T19%3A00%3A11Z&sks=b&skv=2021-08-06&sig=WhGKkyj1bzaedDcuFvO2LXxILpgBEhg/gXGIeZvSsWI%3D",
                "143.688",
                "2023-12-03",
                ["arxiv"],  # Fix: Remove trailing comma
                False,
            ),
            create_episode_dict(
                "Episode 1",
                "Episode 1 description",
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fe529a64193929.5aca8500ba9ab.jpg",
                "00:00:00",
                "2021-01-01",
                [],  # Fix: Remove trailing comma
                False,
            ),
        ],
    ),
]

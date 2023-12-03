import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import AudioPlayer from "material-ui-audio-player";
import React from "react";
import { useLocation } from "react-router-dom";

const Digest = () => {
	const { state } = useLocation();

	useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

	const digestData = {
		digestName: state.digestName ?? "The Daily Digest",
		digestDescription: state.digestDescription ?? "This podcast is about...",
		contentFrequency: state.digestFrequency ?? "1 week",
		narrationStyle: state.narrationStyle ?? "scientific",
		sources: state.sources ?? ["source 1", "src 2", "src 3"],
		episodes: [
			{
				id: 0,
				episodeName: state.episodeName ?? "Episode 1",
				episodeSummary: state.episodeSummary ?? "This is a summary of the episode.",
				episodeMP3path: state.episodeMP3path ?? process.env.PUBLIC_URL + "/test.mp3",
				episodeImageUrl: state.episodeImageUrl ?? process.env.PUBLIC_URL + "/logo512.png",
				episodeDuration: state.episodeDuration ?? "00:00:00",
				episodePublishedAt: state.episodePublishedAt ?? "2021-10-01",
			},
		],
	};

	const item = digestData.episodes[0];

	// Function to calculate how many days ago the episode was created
	const calculateDaysAgo = (createdDate) => {
		const currentDate = new Date();
		const differenceInTime = currentDate - new Date(createdDate);
		return Math.floor(differenceInTime / (1000 * 3600 * 24));
	};

	return (
		<>
			<Card sx={{ width: "100%" }}>
				<CardActionArea>
					<CardMedia component="img" height="140" image={item.episodeImageUrl} />
					<CardContent>
						<AudioPlayer
							elevation={0}
							width="100%"
							variation="primary"
							spacing={3}
							autoplay={false}
							order="standart"
							preload="auto"
							loop={false}
							src={item.episodeMP3path}
						/>

						<Typography gutterBottom variant="h5" component="div">
							{item.episodeName}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{item.episodeSummary}
						</Typography>
						{/* print all the sources */}
						<Typography variant="subtitle1" color="text.secondary">
							Sources:
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{digestData.sources.map((source, index) => (
								<div key={index}>{source}</div>
							))}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default Digest;

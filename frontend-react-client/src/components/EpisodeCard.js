import { Card, CardContent, CardMedia, Chip, Typography, CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function formatDuration(duration) {
  if (duration === null || duration === undefined || isNaN(duration)) {
    return 'NaN';
  }

  // Convert duration to seconds if it's in HH:MM:SS format
  if (typeof duration === 'string' && duration.includes(':')) {
    const [hours, minutes, seconds] = duration.split(':');
    duration = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  }

  // Handle negative durations
  const isNegative = duration < 0;
  duration = Math.abs(duration);

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60); // Use Math.floor to remove decimals

  let formattedString = '';

  if (minutes > 0) {
    formattedString += `${minutes}min `;
  }

  if (seconds > 0 || formattedString === '') {
    formattedString += `${seconds}s`;
  }

  if (isNegative) {
    formattedString = '-' + formattedString;
  }

  return formattedString.trim();
}


const EpisodeCard = ({ item, className }) => {
	const navigate = useNavigate();

	console.log("[EpisodeCard] Item to show:", item);

	const title = item.episodeName;
	const description = item.episodeSummary;
	const imageUrl = item.episodeImageUrl;
	const episodeDuration = item.episodeDuration; // Format: HH:MM:SS
	const formattedDuration = formatDuration(episodeDuration);
	const episodePublishedAt = item.episodePublishedAt; // Format: YYYY-MM-DD
	const hasBeenListenedTo = item.hasBeenListenedTo;
	const episodeMP3path = item.episodeMP3path;

	const calculateDaysAgo = (createdDate) => {
		const currentDate = new Date();
		const differenceInTime = currentDate - new Date(createdDate);
		return Math.floor(differenceInTime / (1000 * 3600 * 24));
	};

	return (
		<Card
			className={`relative ${className}`}
      sx={{ height: 350 }}
			onClick={() =>
				navigate("/digest/0", {
					state: {
						digestName: "The Daily Digest",
						digestDescription: "This podcast is about...",
						digestFrequency: "1 week",
						narrationStyle: "scientific",
						sources: ["source 1", "src 2", "src 3"],
						episodeName: title,
						episodeSummary: description,
						episodeImageUrl: imageUrl,
						episodeDuration: episodeDuration,
						episodePublishedAt: episodePublishedAt,
						hasBeenListenedTo: hasBeenListenedTo,
						episodeMP3path: episodeMP3path,
					},
				})
			}
		>
			{
        episodeDuration === undefined || episodeDuration === "" ? (
          <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <CardMedia
            component="img"
            alt="Episode Image"
            height="100px"
            image={imageUrl}
            style={{ height: "140px" }} // Set the height explicitly
          />
        )
      }
			<CardContent className="absolute top-32 flex flex-col h-48 justify-between">
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs">{`Created ${calculateDaysAgo(episodePublishedAt)} days ago`}</p>					
          <div className="flex w-full mt-1 items-center justify-between text-xs">
            <div>
              {formattedDuration}
            </div>
            <div>
              {hasBeenListenedTo ? null : (
                <Chip label="New" color="primary" size="small" variant="filled" />
              )}
            </div>
          </div>
        </div>
			</CardContent>
		</Card>
	);
};

export default EpisodeCard;

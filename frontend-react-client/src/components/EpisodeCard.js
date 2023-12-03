import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';


const EpisodeCard = ({ item, className }) => {

  // Destructure the item object
  const title = item.episodeName;
  const description = item.episodeSummary;
  const imageUrl = item.episodeImageUrl;
  const episodeDuration = item.episodeDuration; // Format: HH:MM:SS
  const episodePublishedAt = item.episodePublishedAt; // Format: YYYY-MM-DD
  const hasBeenListenedTo = item.hasBeenListenedTo;
  const episodeMP3path = item.episodeMP3path;

  // Function to calculate how many days ago the episode was created
  const calculateDaysAgo = (createdDate) => {
    const currentDate = new Date();
    const differenceInTime = currentDate - new Date(createdDate);
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  return (
    <Card className={`${className}`}>
      <CardMedia component="img" alt="Episode Image" height="140" image={imageUrl} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {`${calculateDaysAgo(episodePublishedAt)} days ago`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';

function formatDuration(duration) {
  const [hours, minutes, seconds] = duration.split(':');
  let formattedString = '';

  if (parseInt(hours, 10) > 0) {
    formattedString += `${parseInt(hours, 10)}h `;
  }

  if (parseInt(minutes, 10) > 0) {
    formattedString += `${parseInt(minutes, 10)}min`;
  }

  // If both hours and minutes are zero, include seconds
  if (formattedString === '' || parseInt(seconds, 10) > 0) {
    formattedString += ` ${parseInt(seconds, 10)}s`;
  }

  return formattedString.trim();
}

const EpisodeCard = ({ item, className }) => {
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
          {`Created ${calculateDaysAgo(episodePublishedAt)} days ago`}
        </Typography>
        <div className='flex w-full items-center justify-between'>
          <Typography variant="caption" color="text.secondary">
            {formattedDuration}
          </Typography>
          {hasBeenListenedTo ? null : (
            <Chip 
              label="New" 
              color="primary" 
              size='small'
              variant='filled'  
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;

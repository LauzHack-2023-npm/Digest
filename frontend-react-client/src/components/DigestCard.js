import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const DigestCard = ({ item, className }) => {

  // Destructure the item object
  const title = item.title;
  const description = item.description;
  const imageUrl = item.imageUrl;
  const createdAt = item.createdAt;

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
          {`${calculateDaysAgo(createdAt)} days ago`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DigestCard;

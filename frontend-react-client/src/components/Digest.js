import React, {useContext} from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import {DigestContext} from "./ContextProvider";
import {useParams} from "react-router-dom";


const Digest = () => {
  const {id} = useParams()
  const {digestSequences, setDigestSequences} = useContext(DigestContext);
  const item = digestSequences[3]
  console.log(item)


  // Function to calculate how many days ago the episode was created
  const calculateDaysAgo = (createdDate) => {
    const currentDate = new Date();
    const differenceInTime = currentDate - new Date(createdDate);
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  return (
      <p>{id}</p>
    // <Card className={`${className}`}>
    //   <CardMedia component="img" alt="Episode Image" height="140" image={imageUrl} />
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {title}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       {description}
    //     </Typography>
    //     <Typography variant="caption" color="text.secondary">
    //       {`${calculateDaysAgo(createdAt)} days ago`}
    //     </Typography>
    //   </CardContent>
    // </Card>
  );
};

export default Digest;

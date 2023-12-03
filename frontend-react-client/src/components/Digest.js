import React, {useContext} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {DigestContext} from "./ContextProvider";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AudioPlayer from 'material-ui-audio-player';


const Digest = () => {

  const dummyDigest = {
    'digestName': 'digestName',
    'digestDescription': 'digestDescription',
    'contentFrequency': 'contentFrequency',
    'narrationStyle': 'narrationStyle',
    'sources': 'sources',
    'customSources': 'customSources',
    'episodes': [
      {
        id: 1,
        episodeName: 'some name',
        episodeSummary: 'some script text',
        episodeMP3path: process.env.PUBLIC_URL + '/test.mp3',
        episodeImageUrl: process.env.PUBLIC_URL + '/logo512.png',
        episodeDuration: '',
        episodePublishedAt: '',
        episodeSources: ['source 1', 'src 2', 'src 3']
      }
    ]
  }

  const {id} = useParams()
  const {digestSequences, setDigestSequences} = useContext(DigestContext);
  const item = dummyDigest.episodes[0]
  console.log(item)


  // Function to calculate how many days ago the episode was created
  const calculateDaysAgo = (createdDate) => {
    const currentDate = new Date();
    const differenceInTime = currentDate - new Date(createdDate);
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  return (<>
        <Card sx={{ width: '100%' }}>
          <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={item.episodeImageUrl}
            />
            <CardContent>
              <AudioPlayer
                  elevation={0}
                  width="100%"
                  variation="primary"
                  spacing={3}
                  autoplay={true}
                  order="standart"
                  preload="auto"
                  loop={true}
                  src={item.episodeMP3path}
              />

              <Typography gutterBottom variant="h5" component="div">
                {item.episodeName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.episodeSummary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

  </>
  );
};

export default Digest;

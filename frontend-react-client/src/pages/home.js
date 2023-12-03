import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import { DigestContext } from '../components/ContextProvider';
import Carousel from '../components/Carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Banner from '../components/Banner';

const HomePage = () => {
  const { digestSequences, setDigestSequences } = useContext(DigestContext);

  // Filter the episodes that have not been listened to
  // This is a list of episodes.
  const newDigestEpisodes = digestSequences.flatMap(sequence => {
    return sequence.episodes.filter(episode => !episode.hasBeenListenedTo);
  });

  // Filter the episodes that have been listened to
  // This is a list of digests with corresponding episodes.
  const listenedEpisodesByDigest = digestSequences.filter(sequence => {
    return sequence.episodes.some(episode => episode.hasBeenListenedTo);
  });

  return (
    <div className='flex flex-col items-center'>
      <Banner />

      {/* BEGIN: Section showing your latest digests. */}
      <div className='flex flex-col w-full px-2 mt-5'>
        <p className='text-left pt-2 pb-2 text-xl font-bold w-full'>Listen Now</p>
        <p className='text-left pt-1 pb-2 text-lg font-bold w-full'>Up Next<ArrowForwardIosIcon className='scale-50' /></p>
        <Carousel items={newDigestEpisodes} />
      </div>
      {/* END */}

      {/* BEGIN: Section showing your previous digests. */}
      <div className='flex flex-col w-full px-2 mt-5'>
        <p className='text-left pt-2 pb-2 text-xl font-bold w-full'>Your Past Digests</p>
        {listenedEpisodesByDigest.map((digest, index) => (
          <div key={index} className='flex flex-col w-full px-2 mt-5'>
            <p className='text-left pt-1 pb-2 text-lg font-bold w-full'>{digest.digestName}<ArrowForwardIosIcon className='scale-50' /></p>
            <Carousel items={digest.episodes} />
          </div>
        ))}
      </div>
      {/* END */}
    </div>
  );
};

export default HomePage;

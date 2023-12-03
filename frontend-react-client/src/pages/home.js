import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import { DigestContext } from '../components/ContextProvider';
import Carousel from '../components/Carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Banner from '../components/Banner';

const HomePage = () => {
  const { digestSequences, incompleteDigestInState } = useContext(DigestContext);
  const [newDigestEpisodes, setNewDigestEpisodes] = useState([]);
  const [listenedEpisodesByDigest, setListenedEpisodesByDigest] = useState([]);

  useEffect(() => {
    // Filter the episodes that have not been listened to
    // This is a list of episodes.
    let notListenedDigestEpisodes = digestSequences.flatMap(sequence => {
      return sequence.episodes.filter(episode => !episode.hasBeenListenedTo);
    });
    // If there is an incomplete state, it is probably being created right now.
    if (incompleteDigestInState.digestName !== ''){
      notListenedDigestEpisodes = [incompleteDigestInState, ...notListenedDigestEpisodes];
    }
    setNewDigestEpisodes(notListenedDigestEpisodes);

    // Filter the episodes that have been listened to
    // This is a list of digests with corresponding episodes.
    setListenedEpisodesByDigest(digestSequences.filter(sequence => {
      return sequence.episodes.some(episode => episode.hasBeenListenedTo);
    }));
  }, [digestSequences, incompleteDigestInState]);

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
        <p className='text-left pt-2 pb-2 text-xl font-bold w-full'>Previous Digests</p>
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

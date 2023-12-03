import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import { DigestContext } from '../components/ContextProvider';
import Carousel from '../components/Carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Banner from '../components/Banner';


const HomePage = () => {

  const { digestSequences, setDigestSequences } = useContext(DigestContext);

  return (
    <div className='flex flex-col items-center'>
      <Banner/>
      {/* Section showing your latest digests. */}
      <div className='flex flex-col w-full px-2 mt-5'>
        <p className='text-left pt-2 pb-2 text-xl font-bold w-full'>Listen Now</p>
        <p className='text-left pt-1 pb-2 text-lg font-bold w-full'>Up Next<ArrowForwardIosIcon className='scale-50'/></p>
        <Carousel items={digestSequences}/>
      </div>
      {/* Section showing your previous digests. */}

    </div>
  )
}

export default HomePage
import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import { DigestContext } from '../components/ContextProvider';
import DigestsCarousel from '../components/DigestsCarousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const HomePage = ({ navbarHeight, footerHeight }) => {

  const { digestSequences, setDigestSequences } = useContext(DigestContext);

  return (
    <div 
      className='flex flex-col items-center justify-center'
      style={{ minHeight: `calc(100vh - ${navbarHeight} - ${footerHeight})` }}
    >
      <p className='text-left pt-2 pb-2 text-xl font-bold w-full'>Listen Now</p>
      <p className='text-left pt-1 pb-2 text-lg font-bold w-full'>Up Next<ArrowForwardIosIcon className='scale-50'/></p>
      <DigestsCarousel items={digestSequences}/>
    </div>
  )
}

export default HomePage
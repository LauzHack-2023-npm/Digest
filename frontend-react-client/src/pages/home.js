import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import { DigestContext } from '../components/ContextProvider';
import DigestsCarousel from '../components/DigestsCarousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const HomePage = ({ navbarHeight, footerHeight }) => {

  // Add state to the application to hold data.
  // The function returns two values, a getter and a setter for the new state.
  // Using a setter function is necessary because by invoking the setter React is 
  // able to trigger updates in the parts of the application that depend on this state. 
  const [currentTime, setCurrentTime] = useState(0);
  const { digestSequences, setDigestSequences } = useContext(DigestContext);

  // Issue a request from the frontend to the backend upon rendering the component.
  useEffect(
    // First argument is the callback function. 
    () => {
      fetch('/api/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
      });
    }, 
    // second argument to useEffect() is optional and can be set to the list of state 
    // variables on which this callback depends. 
    []
  );

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
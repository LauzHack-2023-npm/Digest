import React, { useState, useRef } from 'react';
import DigestCard from './DigestCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const DigestsCarousel = ({ items, cardHeight = '40', cardWidth = '40' }) => {

  const slider = React.createRef();
  var settings = {
    // dots: true,
    infinite: false,  // If false, cannot go past first and last slides
    // speed: 500,
    slidesToShow: 2,  // Number of slides to show at a time
    slidesToScroll: 1,
    arrows: false,
  };

  const sliderButtonClassName = 'absolute top-1/2 -translate-y-4 rounded-full text-dark dark:text-light bg-light-accent2 dark:bg-dark text-4xl p-1 z-20 opacity-50 hover:opacity-70';

  return (
    <div className="relative w-full h-full pt-3 md:pt-0 md:w-3/5 max-h-80 md:h-auto" >
      {items.length > 1 ?
        <ArrowBackIosIcon onClick={() => slider.current.slickPrev()} className={`${sliderButtonClassName} left-0`} />
        : null
      }
      <Slider {...settings} ref={slider} className='px-2 overflow-visible'>
        {
          items.map((item, idx) => {
            return (
              //<div key={idx} className='flex items-center justify-center h-full'>
              <DigestCard key={idx} className='' alt={`Image ${idx + 1}`} />
              //</div>
            );
          })
        }
      </Slider>
      {items.length > 1 ?
        <ArrowForwardIosIcon onClick={() => slider.current.slickNext()} className={`${sliderButtonClassName} right-0 `} />
        : null
      }
    </div>
  );
};

export default DigestsCarousel;

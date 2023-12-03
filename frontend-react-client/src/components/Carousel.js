import React, { useState, useRef } from 'react';
import EpisodeCard from './EpisodeCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Carousel = ({ items, cardHeight = '40', cardWidth = '40' }) => {

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
    <div className="relative w-full h-full max-h-80 md:h-auto" >
      {items.length > 1 ?
        <ArrowBackIosIcon onClick={() => slider.current.slickPrev()} className={`${sliderButtonClassName} left-0`} />
        : null
      }
      <Slider {...settings} ref={slider} className='px-1 overflow-visible'>
        {
          items.map((item, idx) => {
            return (
              <EpisodeCard key={idx} className='m-1 w-40' item={item} />
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

export default Carousel;

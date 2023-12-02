import React from 'react';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Banner = () => {
  return (
    <div className="relative w-screen text-center h-96">
      {/* Video or Image Background */}
      <div className="absolute inset-0">
        {/* Replace 'video.mp4' with your video file or 'image.jpg' with your image file */}
        <video className="w-full h-full object-cover" src={process.env.PUBLIC_URL + '/geometric_abstract.mp4'} autoPlay loop muted>
          {/* <source src= type="video/mp4" /> */}
        </video>
      </div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl w-full pb-10 text-white font-bold">Digest is here</p>
        <p className="text-2xl w-full text-white font-bold">Discover ...</p>
        {/* Call to Action Button */}
        <div className="pt-10">
          <Button variant="contained" color="primary">
            Create a Digest<OpenInNewIcon className='pl-2 scale-125'/>
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Banner;

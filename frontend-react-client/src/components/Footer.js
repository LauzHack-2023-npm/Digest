import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex bg-bgColor-dark text-textColor'>
      <div className='flex w-full max-w-4xl m-auto p-2 justify-between'>
        <div className="left">© {currentYear}</div>
        <div className="center">Made with 🧀 in Lausanne.</div>
        <div className="right">
          <a href="https://github.com/LauzHack-2023-npm/Digest"><GitHubIcon className='scale-110'/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
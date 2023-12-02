import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = ({ height }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className='flex bg-bgColor-dark text-textColor'
      style={{ height: `${height}` }}
    >
      <div className='flex w-full max-w-4xl m-auto justify-between'>
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
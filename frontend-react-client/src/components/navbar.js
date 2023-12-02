import React from 'react'
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PersonIcon from '@mui/icons-material/Person';


const Navbar = () => {
    return (
        <nav className='flex flex-col items-center justify-center'>
            <div>
                <Link className="App-link" to="/">
                    <HomeIcon/>
                </Link>
                &nbsp;|&nbsp;
                <Link className="App-link" to="/add-digest">
                    <PlaylistAddIcon/>
                </Link>
                &nbsp;|&nbsp;
                <Link className="App-link" to="/user">
                    <PersonIcon/>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Image from "material-ui-image";
import { Link, useNavigate } from 'react-router-dom';

const pagesDict = {
  "Home": '/',
  "Create A Digest": '/add-digest',
};

const settingsDict = {
  "Profile": '/',
  "Logout": '/',
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" className="bg-primary.DEFAULT">
      <Container maxWidth="xl">
        <Toolbar disableGutters className='max-w-2xl m-auto'>
          <img 
            src={process.env.PUBLIC_URL + '/digest-logo-1_380x519.png'}
            className='h-10 mr-1 hidden md:flex'  
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className="text-white"
          >
            DIGEST
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.keys(pagesDict).map((pageName, idx) => (
                <Link key={pageName} to={pagesDict[pageName]}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className="text-primary.DEFAULT">{pageName}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <img 
            src={process.env.PUBLIC_URL + '/digest-logo-1_380x519.png'}
            className='h-10 mr-2 flex md:hidden'  
            onClick={() => navigate('/')}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className="text-white"
          >
            DIGEST
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(pagesDict).map((pageName, idx) => (
              <Link key={pageName} to={pagesDict[pageName]}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className="text-white"
                >
                  {pageName}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Pemy Sharp" src={process.env.PUBLIC_URL + '/avatar.jpg'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settingsDict).map((setting, idx) => (
                <Link key={setting} to={settingsDict[setting]}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" className="text-primary.DEFAULT">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

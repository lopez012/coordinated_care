import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import heartlogo from '../c.c_components/img/Heart_Rate.png'
import '../stylesheets/App.css'

const settings = ['Profile', 'Settings', 'Send Feedback', 'Logout'];


export default function Topbanner({setCurrentPage}) {

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if(setting==='Settings'){
        setCurrentPage('Settings Page');
    }
    if(setting==='Profile'){
      setCurrentPage('profile-screen')
      
    }
    if(setting==='Send Feedback'){
      setCurrentPage('send-feedback') 
    }

  };


  return (
    <>
    <div className='topbanner'>
    <img src={heartlogo} className='heartlogo' />
    <h2 className='banner-app-name'>Coordinated Care</h2> 

    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
        {settings.map((setting) => (

          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>


            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
    </div>
    </>
  );
}


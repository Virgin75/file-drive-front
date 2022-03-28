import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import "../index.css"

export default function Header() {

  const [search, setSearch] = React.useState('');
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
  }, []);

    return (
      <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <div className='header'>
            <span className="mainTitle">LogoName</span>
            <div className="search">
              <TextField 
                sx={{marginLeft: '35px'}} 
                label="Search files or folders..." 
                variant="filled" 
                value={search}
                onChange={handleChange}/>
              <Button 
                variant="contained" 
                disableElevation
                endIcon={<SearchIcon />}
                sx={{height: '66px', borderRadius: '0px 5px 5px 0px'}}>
                Search
              </Button>
            </div>
            <Tooltip title="My account">
              <IconButton className="btnHeader" href="/profile" color="primary" aria-label="ffd">
                <AccountCircleIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Log out">
              <IconButton onClick={() => {
                localStorage.setItem('user', '');
                window.location.href = '/login/'
              }} color="primary">
                <PowerSettingsNewIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            
      </div>
      </>
      
    );
  }
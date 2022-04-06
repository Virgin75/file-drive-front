import React, { useEffect, useState, useContext } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import searchContext from '../SearchContext'
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import "../index.css"

export default function Header() {

  const { keyword, setKeyword, search, setSearch } = useContext(searchContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleClick = (event) => {
    setSearch(!search)
    navigate("/search", { replace: true });
  }

  const goToHome = () => {
    navigate("/my-drive", { replace: true });
  }


    return (
      <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <div className='header'>
            <img width="130px" height="auto" onClick={goToHome} src={logo} />
            <div className="search">
              <TextField 
                sx={{marginLeft: '35px', width: '39vw', borderRadius: '5px 0px 0px 5px'}} 
                label="Search your files or folders..." 
                variant="outlined" 
                value={keyword}
                onChange={handleChange} />
              <Button 
                variant="contained"
                disableElevation
                endIcon={<SearchIcon />}
                onClick={handleClick}
                sx={{height: '64px', borderRadius: '0px 5px 5px 0px', marginLeft: '-12px'}}>
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
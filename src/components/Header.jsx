import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

import "../index.css"

export default function Header() {

  const APIHost = React.useContext(APIHostContext)
  const [user, setUser] = React.useState('');

  React.useEffect(() => {
  }, []);

    return (
      <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <div className='header'>
            <span>LogoName</span>
            <IconButton href="/profile" color="primary" aria-label="ffd">
              <AccountCircleIcon fontSize="large"/>
            </IconButton>

            <IconButton onClick={() => {
              localStorage.setItem('user', '');
              window.location.href = '/login/'
            }} color="primary">
              <PowerSettingsNewIcon fontSize="large" />
            </IconButton>
            
      </div>
      </>
      
    );
  }
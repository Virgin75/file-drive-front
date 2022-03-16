import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
            <a href="" className='btnHeader'>
                <AccountCircleIcon color="primary" fontSize="large" />
            </a>
            <a href="">
                <PowerSettingsNewIcon color="primary" fontSize="large" />
            </a>
      </div>
      </>
      
    );
  }
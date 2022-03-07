import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import "../index.css"

export default function Header() {

  const APIHost = React.useContext(APIHostContext)
  const [user, setUser] = React.useState('');

  React.useEffect(() => {
  }, []);

    return (
      <>
      <div className='header'>
            Header
      </div>
      </>
      
    );
  }
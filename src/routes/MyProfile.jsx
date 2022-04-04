import React, { useEffect, useState, useContext } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import UpdateListContext from '../UpdateListContext';

export default function MyProfile() {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');


  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const updateData = () => {
    const user = localStorage.getItem("user");

    setIsLoading(true)

    const headers = {
      "content-Type":'application/json',
      "Authorization": 'Bearer ' + user,
    }
    const body = {
      'email': email,
      'first_name': firstName,
      'last_name': lastName
    }
    const params = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(body)
    }
    fetch(APIHost + '/my-profile', params)
      .then(results => results.json())
      .then(data => {
        setIsLoading(false)
      });
  }

  React.useEffect(() => {
    // Set user token from local storage
    const user = localStorage.getItem("user");
    if (user == '') {
      navigate("/login", { replace: true });
    }
    else {
      setIsLoading(true)

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const params = {
        method: 'GET',
        headers: headers
      }
      fetch(APIHost + '/my-profile', params)
        .then(results => results.json())
        .then(data => {
          setIsLoading(false)
          setEmail(data.email)
          setFirstName(data.first_name)
          setLastName(data.last_name)
          
        });
    }
   
  }, []);


  const DisplayContent = () => {
    return <>
    <div className='twoSections'>
      <div className="left">
        <LeftBar/>
      </div>
      <div className="right">
        <div className='topSection'>
          <h1>Your account details</h1>
        </div>
        <div>
          <TextField
            label="Email"
            value={email}
            sx={{marginBottom: '16px', width: '50%'}}
            onChange={handleChangeEmail}
            /><br></br>
          <TextField
            label="First name"
            value={firstName}
            sx={{marginBottom: '16px', width: '50%'}}
            onChange={handleChangeFirstName}
            /><br></br>
          <TextField
            label="Last Name"
            value={lastName}
            sx={{marginBottom: '16px', width: '50%'}}
            onChange={handleChangeLastName}
            /><br></br>
          <Button onClick={updateData} variant="contained">Update</Button>
        </div>
        <div>
            {isLoading ? (
              <Rings color="#00BFFF" height={150} width={150} />
            ) : (
              <></>
            )}
          </div>
      </div>
    </div>
    </>
  }
    return (
      <>
      <Header />
      <DisplayContent />  
      </>
      
    );
  }
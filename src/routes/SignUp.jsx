import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom'

export default function SignUp() {
  const APIHost = React.useContext(APIHostContext)
  const [user, setUser] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSignupSuccessful, setIsSignupSuccessful] = React.useState('')
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');


  React.useEffect(() => {
    // Set user token from local storage
    const usr = localStorage.getItem("user");
    setUser(usr);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    const headers = {
      "content-Type":'application/json'
    }
    const data = {
      email: email,
      password: password,
      'first_name': fname,
      'last_name': lname
    }
    const params = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }

    fetch(APIHost + '/signup', params)
      .then(results => results.json())
      .then(data => {

        setIsLoading(false)
        if (data.email == email) {
          setIsSignupSuccessful('yes')
        }
        else {
          setIsSignupSuccessful('no')
        }        
        
      });
  };
    return (
      <>
      {isSignupSuccessful == 'yes' ? (
            <Navigate to='/login'  />
          ) : isSignupSuccessful == 'no' ? (
            <span>There is a mistake in one of the submitted fields.</span>
          ) : <></>}
      <div className='loginContainer'>
        <h1 class="welcome">Welcome to AppName 👋</h1>
        <main className="login">
        <h2>Sign up below or <a href="/login">login on this page.</a></h2>
        <form onSubmit={handleSubmit}>
          <label>Email : </label>
          <input 
            type='text' 
            value={email}
            placeholder="Enter your email..."
            onChange={({target}) => setEmail(target.value)}
          /><br></br>
          <label>First name : </label>
          <input 
            type='text' 
            value={fname}
            placeholder="Enter your first name..."
            onChange={({target}) => setFname(target.value)}
          /><br></br>
          <label>Last name : </label>
          <input 
            type='text' 
            value={lname}
            placeholder="Enter your last name..."
            onChange={({target}) => setLname(target.value)}
          /><br></br>
          <label>Password : </label>
          <input 
            type='password' 
            value={password}
            placeholder="Enter your password"
            onChange={({target}) => setPassword(target.value)}
          />
          <button type="submit">Sign up</button>
        </form>
        <div>
          {isLoading ? (
            <Rings color="#00BFFF" height={150} width={150} />
          ) : (
            <></>
          )}
        </div>
      </main>
      </div>
      </>
      
    );
  }
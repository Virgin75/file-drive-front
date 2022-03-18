import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
  const APIHost = React.useContext(APIHostContext)
  const [accessToken, setAccessToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();



  React.useEffect(() => {
    if (accessToken != null) {
      navigate("/my-drive", { replace: true });
    }
  }, [accessToken]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    const headers = {
      "content-Type":'application/json'
    }
    const data = {
      email: email,
      password: password
    }
    const params = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }

    fetch(APIHost + '/api/token/', params)
      .then(results => results.json())
      .then(data => {
        setIsLoading(false)
        const token = data.access;
        localStorage.setItem('user', token)
        setAccessToken(token);
      });
  };
    return (
      <>
      <div className='loginContainer'>
        <h1 class="welcome">Welcome to AppName 👋</h1>
        <main className="login">
          <h2>Please login below or <a href="/signup">create an account.</a></h2>
          <form onSubmit={handleSubmit}>
            <label>Email : </label>
            <input 
              type='text' 
              value={email}
              placeholder="Enter your email..."
              onChange={({target}) => setEmail(target.value)}
            /><br></br>
            <label>Password : </label>
            <input 
              type='password' 
              value={password}
              placeholder="Enter your password"
              onChange={({target}) => setPassword(target.value)}
            />
            <button type="submit">Sign in</button>
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
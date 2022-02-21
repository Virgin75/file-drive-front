import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';

export default function Expenses() {
  const APIHost = React.useContext(APIHostContext)
  const [accessToken, setAccessToken] = React.useState(null);

  const headers = {
    "content-Type":'application/json'
  }
  const data = {
    email: 'virgin.bitton38@gmail.com',
    password: 'Azerty123$'
  }
  const params = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }

  React.useEffect(() => {
    fetch(APIHost + '/api/token/', params)
      .then(results => results.json())
      .then(data => {
        const token = data.access;
        setAccessToken(token);
      });
  }, []);


    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Login</h2>
        <p>{accessToken}</p>
      </main>
    );
  }
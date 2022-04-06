import React from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'

export default function Login() {
  const APIHost = React.useContext(APIHostContext)
  const [accessToken, setAccessToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoginSuccessful, setIsLoginSuccessful] = React.useState('')
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

        // A token was returned --> All good
        if (token != undefined) {
          localStorage.setItem('user', token)
          setAccessToken(token);
        }
        // Display error message
        else {
          window.scrollTo(0, 0);
          setIsLoginSuccessful('no')
        }
        
      });
  };
    return (
      <>
      {isLoginSuccessful == 'no' ? (
            <div className="errorContainer">
              <span className='error'>❌ There is a mistake in one of the submitted fields.</span>
            </div>
          ) : <></>}
      <div className='loginContainer'>
        <h1 className="welcome">Welcome to AppName 👋</h1>
        <main className="login">
        <img width="200px" height="auto"  src={logo} />
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
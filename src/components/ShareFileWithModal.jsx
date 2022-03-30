import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import LeftBar from './LeftBar';
import FilesAndFoldersList from './FilesAndFoldersList';
import Button from '@mui/material/Button';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

export default function ShareFileWithModal(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [showError, setShowError] = React.useState(false)

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const shareFile = () => {
    setIsLoading(true)
    const user = localStorage.getItem("user");

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const body = {
        email: email,
      }
      const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }
      
      fetch(APIHost + '/api/files/' + props.id + '/share', params)
          .then(results => results.json())
          .then(data => {
            setIsLoading(false)
            if (data.error || data.email) {
              setShowError(true)
            }
            else {
              props.handleClose()
              window.location.reload();
            }
        });
  };

  const displayErrorMessage = () => {
    if (showError) {
      return <Alert severity="error">This user does not exist or has an invalid email. Try again.</Alert>
    }
  }


    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Share this file with another user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What is the email address of the user you'd like to share this file with?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            label="Email address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleChange}
          />
           <div>
            {isLoading ? (
              <Rings color="#00BFFF" height={150} width={150} />
            ) : (
              <></>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={shareFile}>Share this file</Button>
        </DialogActions>
        {displayErrorMessage()}
      </Dialog>
      </>
      
    );
  }
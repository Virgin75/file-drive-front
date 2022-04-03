import React, { useEffect, useState, useContext } from 'react';
import UpdateListContext from '../UpdateListContext';
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

export default function ShareFolderWithModal(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [showError, setShowError] = React.useState(false)
  const { needsUpdate, setNeedsUpdate } = useContext(UpdateListContext);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const shareFolder = () => {
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
      
        fetch(APIHost + '/api/folders/' + props.id + '/share', params)
          .then(results => results.json())
          .then(data => {
            setIsLoading(false)
            if (data.error || data.email) {
              setShowError(true)
            }
            else {
              props.handleClose()
              //Update the files and folders list
              setNeedsUpdate(!needsUpdate)
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
        <DialogTitle>Share this folder with another user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What is the email address of the user you'd like to share this folder with?
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
          <Button onClick={shareFolder}>Share this folder</Button>
        </DialogActions>
        {displayErrorMessage()}
      </Dialog>
      </>
      
    );
  }
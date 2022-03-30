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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonIcon from '@mui/icons-material/Person';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export default function SharedWithModal(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [showError, setShowError] = React.useState(false)

  console.log(props)
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
      
      fetch(APIHost + '/api/' + props.type + 's/' + props.id + '/share', params)
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

  const revokeAccess = (email) => {
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
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(body)
      }
      
      fetch(APIHost + '/api/' + props.type + 's/' + props.id + '/share', params)
          .then(() => {
            setIsLoading(false)
            props.handleClose()
            window.location.reload();
          })
  };

  const displayErrorMessage = () => {
    if (showError) {
      return <Alert severity="error">This user does not exist or has an invalid email. Try again.</Alert>
    }
  }


    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>This {props.type} has been shared with:</DialogTitle>
        <DialogContent>
        <List>
          {props.users.map((user) => (
             <ListItem disablePadding>
             <ListItemButton>
               <ListItemIcon>
                 <PersonIcon />
               </ListItemIcon>
               <ListItemText primary={user} />
                <ListItemIcon>
                <Tooltip title="Revoke access to this user">
                  <DeleteIcon onClick={() => revokeAccess(user)}/>
                </Tooltip>
               </ListItemIcon>
             </ListItemButton>
           </ListItem> 
          ))}    
        </List>
        <Divider sx={{marginBottom: '22px'}}/>
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
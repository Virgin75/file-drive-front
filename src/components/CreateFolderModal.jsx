import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import FilesAndFoldersList from '../components/FilesAndFoldersList';
import Button from '@mui/material/Button';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateFolderModal(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [name, setName] = React.useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const createFolder = () => {
    setIsLoading(true)
    const user = localStorage.getItem("user");

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const body = {
        folder_name: name,
        parent_folder: props.currentFolder  
      }
      const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }
      

      // Get root folder id
      fetch(APIHost + '/api/folders/', params)
        .then(results => results.json())
        .then(data => {
          setIsLoading(false)
          props.handleClose()
        });
  };

  React.useEffect(() => {
  }, []);

    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add a new folder to the current directory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose the name of the new folder you want to create.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="folder_name"
            label="New folder name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
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
          <Button onClick={createFolder}>Create new folder</Button>
        </DialogActions>
      </Dialog>
      </>
      
    );
  }
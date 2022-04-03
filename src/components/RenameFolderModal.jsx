import React, { useEffect, useState, useContext } from 'react';
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
import UpdateListContext from '../UpdateListContext';

export default function RenameFolderModal(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [name, setName] = React.useState('');
  const { needsUpdate, setNeedsUpdate } = useContext(UpdateListContext);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const renameFolder = () => {
    setIsLoading(true)
    const user = localStorage.getItem("user");

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const body = {
        folder_name: name,
      }
      const params = {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body)
      }
      
      fetch(APIHost + '/api/folders/' + props.id, params)
        .then(() => {
          setIsLoading(false)
          props.handleClose()
          //Update the files and folders list
          setNeedsUpdate(!needsUpdate)
        });
  };

  React.useEffect(() => {
  }, []);

    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Edit the name of this folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type the name of your choice in the input below.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="folder_name"
            label="folder name"
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
          <Button onClick={renameFolder}>Edit the name</Button>
        </DialogActions>
      </Dialog>
      </>
      
    );
  }
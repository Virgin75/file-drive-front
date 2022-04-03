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
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';


export default function DeleteFolderModal(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const { needsUpdate, setNeedsUpdate } = useContext(UpdateListContext);

  const deleteFolder = () => {
    setIsLoading(true)
    const user = localStorage.getItem("user");

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const params = {
        method: 'DELETE',
        headers: headers,
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
        <DialogTitle>Are you sure to delete this folder?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to retrieve this folder after this action.
          </DialogContentText>
          
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
          <Button onClick={deleteFolder}>Yes, delete this folder</Button>
        </DialogActions>
      </Dialog>
      </>
      
    );
  }
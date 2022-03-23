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
import { styled } from '@mui/material/styles';


export default function UploadFileModal(props) {

  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [file, setFile] = React.useState();
  const [isFileSelected, setIsFileSelected] = React.useState(false);

  React.useEffect(() => {
    setIsFileSelected(false)
    setIsLoading(false)
  }, [props.open]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const uploadFile = () => {
    setIsLoading(true)
    console.log(props.currentFolder)
    const user = localStorage.getItem("user");

      const headers = {
        "Authorization": 'Bearer ' + user,
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", file.name);
      formData.append("parent_folder", props.currentFolder);

      const params = {
        method: 'POST',
        headers: headers,
        body: formData
      }
      

      fetch(APIHost + '/api/files/', params)
        .then(results => results.json())
        .then(data => {
          setIsLoading(false)
          props.handleClose()
          //TODO: avant de rediriger, afficher un message de validation de succès.
          window.location.reload();
        });
  };


    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Upload a new file to your drive</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a file below:
          </DialogContentText>
          <label htmlFor="contained-button-file">
            <input
              type="file"
              onChange={handleChange} />
          </label>
          <DialogContentText sx={{marginTop: '10px'}}>
            This file will be uploaded to the folder you are viewing right now.
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
          {isFileSelected 
          ? (<Button onClick={uploadFile}>UPLOAD THE FILE</Button>) 
          : (<Button disabled onClick={uploadFile}>UPLOAD THE FILE</Button>)
          }
          
        </DialogActions>
      </Dialog>
      </>
      
    );
  }
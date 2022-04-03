import React, { useEffect, useState, useContext } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import FilesAndFoldersList from '../components/FilesAndFoldersList';
import Button from '@mui/material/Button';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import CreateFolderModal from '../components/CreateFolderModal'
import Chip from '@mui/material/Chip';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import UpdateListContext from '../UpdateListContext';

export default function MyDrive() {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [folders, setFolders] = React.useState([])
  const [files, setFiles] = React.useState([])
  const [rootFolder, setRootFolder] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const { needsUpdate } = useContext(UpdateListContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    // Set user token from local storage
    const user = localStorage.getItem("user");
    console.log(user)
    if (user == '') {
      navigate("/login", { replace: true });
    }
    else {
      setIsLoading(true)

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const params = {
        method: 'GET',
        headers: headers
      }
      // Get root folder id
      fetch(APIHost + '/api/folders/', params)
        .then(results => results.json())
        .then(data => {
          const result = data.filter(obj => {
            return obj.folder_name === "root"
          })
          // Get content in root folder
          fetch(APIHost + '/api/folders/'+ result[0].id +'/content', params)
            .then(results => results.json())
            .then(data => {
              setIsLoading(false)
              setFolders(data.subfolders)
              setFiles(data.files)
              setRootFolder(result[0].id)
            });
        });
    }
   
  }, [needsUpdate]);


  const DisplayContent = () => {
    return <>
    <div className='twoSections'>
      <div className="left">
        <LeftBar currentFolder={rootFolder}/>
      </div>
      <div className="right">
        <div className='topSection'>
          <h1>My Drive</h1>
          <Chip icon={<RouteOutlinedIcon fontSize="small" />} sx={{marginLeft: '18px'}} label="Root folder" />
          <Button onClick={handleClickOpen} sx={{justifySelf: 'flex-end', marginLeft: 'auto', maxHeight: '48px', minWidth: '212px'}} variant="contained" startIcon={<CreateNewFolderOutlinedIcon />}>
            Create new folder
          </Button>
          <CreateFolderModal 
            open={open} 
            handleClose={handleClose} 
            currentFolder={rootFolder}/>
        </div>
        
        <FilesAndFoldersList 
          files={files} 
          folders={folders} 
          showShareColumn={true}/>
       
        <div>
            {isLoading ? (
              <Rings color="#00BFFF" height={150} width={150} />
            ) : (
              <></>
            )}
          </div>
      </div>
    </div>
    </>
  }
    return (
      <>
      <Header />
      <DisplayContent />  
      </>
      
    );
  }
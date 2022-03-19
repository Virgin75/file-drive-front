import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import FilesAndFoldersList from '../components/FilesAndFoldersList';
import Button from '@mui/material/Button';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import CreateFolderModal from '../components/CreateFolderModal'
import { useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function FolderView(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [folders, setFolders] = React.useState([])
  const [files, setFiles] = React.useState([])
  const [rootFolder, setRootFolder] = React.useState('')
  const [parentFolder, setParentFolder] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [folderName, setFolderName] = React.useState('');

  const navigate = useNavigate();
  const params = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleBackClick = () => {
    navigate("/folders/" + parentFolder + '/', { replace: true });
  }


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
      const options = {
        method: 'GET',
        headers: headers
      }
      // Get content in root folder
      fetch(APIHost + '/api/folders/'+ params.id +'/content', options)
      .then(results => results.json())
      .then(data => {
        setIsLoading(false)
        setFolders(data.subfolders)
        setFiles(data.files)
        setRootFolder(params.id)
        setFolderName(data.folder_name)
        setParentFolder(data.parent_folder)
      });
    }
   
  }, [open, params]);


  const DisplayContent = () => {
    return <>
    <div className='twoSections'>
      <div className="left">
        <LeftBar />
      </div>
      <div className="right">
        <div className='topSection'>
          <h1>{folderName}</h1>
          <Button onClick={handleClickOpen} sx={{justifySelf: 'flex-end', marginLeft: 'auto', maxHeight: '48px', minWidth: '212px'}} variant="contained" startIcon={<CreateNewFolderOutlinedIcon />}>
            Create new folder
          </Button>
          <CreateFolderModal 
            open={open} 
            handleClose={handleClose} 
            currentFolder={rootFolder}/>
        </div>
        <Button onClick={handleBackClick} startIcon={<ArrowBackIcon />} variant="outlined">Go back to parent folder</Button>
        <FilesAndFoldersList files={files} folders={folders} />
       
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
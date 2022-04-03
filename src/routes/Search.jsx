import React, { useEffect, useState, useContext } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import FilesAndFoldersList from '../components/FilesAndFoldersList';
import Button from '@mui/material/Button';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import Chip from '@mui/material/Chip';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import searchContext from '../SearchContext';

export default function Search() {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [folders, setFolders] = React.useState([])
  const [files, setFiles] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const { keyword, setKeyword, search, setSearch } = useContext(searchContext);


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
      // Get content in root folder
      fetch(APIHost + '/api/search?keyword=' + keyword, params)
      .then(results => results.json())
      .then(data => {
        setIsLoading(false)
        setFolders(data.folders)
        setFiles(data.files)
      });
    }
   
  }, [open, search]);


  const DisplayContent = () => {
    return <>
    <div className='twoSections'>
      <div className="left">
        <LeftBar/>
      </div>
      <div className="right">
        <div className='topSection'>
          <h1>🔍 {folders.length + files.length} result(s) for your search...</h1>          
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
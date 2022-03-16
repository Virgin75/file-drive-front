import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar'

export default function MyDrive() {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [folders, setFolders] = React.useState([])
  const [files, setFiles] = React.useState([])

  const navigate = useNavigate();



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
            });
        });
    }
   
  }, []);

  const DisplayFolders = () => {
    return folders.map((item, index) => (
      <span className="indent" key={index}>
          <li><b>Dossier : </b>{item.folder_name}</li>
      </span>
  ));
  }

  const DisplayFiles = () => {
    return files.map((item, index) => (
      <span className="indent" key={index}>
          <li>{item.file_name}</li>
      </span>
  ));
  }

  const DisplayContent = () => {
    return <>
    <div className='twoSections'>
      <div className="left">
        <LeftBar />
      </div>
      <div className="right">
        <h1>My Drive</h1>
        <DisplayFolders />
        <DisplayFiles />
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
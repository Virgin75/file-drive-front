import React, { useEffect, useState, useRef } from 'react';
import {APIHostContext} from '../APIHostContext';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Rings } from 'react-loader-spinner';

export default function DownloadLink(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const linkRef = useRef(null);

  const formatFileType = () => {
    const type = props.file_type
    return type.split('/')[1]
  }

  const downloadFile = () => {
    setIsLoading(true)
    const user = localStorage.getItem("user");

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const params = {
        method: 'GET',
        headers: headers
      }
      
      fetch(APIHost + props.link, params)
        .then(response => {
          setIsLoading(false)
          return response.blob()
        })
        .then(blob => {
          const href = window.URL.createObjectURL(blob)
          const a = linkRef.current
          a.download = props.file_name + '.' + formatFileType();
          a.href = href
          a.click()
          a.href = ''
        })
        .catch(err => {
          console.error(err)
          console.log('error')
        });
  }

    return (
      <>
      <div>
            {isLoading ? (
              <Rings color="#00BFFF" height={85} width={85} />
            ) : (
              <IconButton 
                className="btnHeader"
                onClick={downloadFile}
                color="primary">
                  <FileDownloadOutlinedIcon 
                    fontSize="medium"/>
              </IconButton>
            )}
            <a ref={linkRef}/>
          </div>
      </>
      
      
    );
  }
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
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MoveFolderModal(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [choice, setChoice] = React.useState('');
  const [folders, setFolders] = React.useState([])
  const { needsUpdate, setNeedsUpdate } = useContext(UpdateListContext);
  
  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const moveFolder = () => {
    setIsLoading(true)
    const user = localStorage.getItem("user");

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const body = {
        parent_folder: choice,
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
    if (props.open == true) {
      setIsLoading(true)
      const user = localStorage.getItem("user");
  
        const headers = {
          "content-Type":'application/json',
          "Authorization": 'Bearer ' + user,
        }
        const params = {
          method: 'GET',
          headers: headers,
        }
        
        fetch(APIHost + '/api/folders/', params)
        .then(results => results.json())
        .then(data => {
          setIsLoading(false)
          setFolders(data)
        });
    }
    
  }, [props.open]);

    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Move this folder into the folder of your choice:</DialogTitle>
        <DialogContent>
          <FormControl sx={{marginTop: '17px'}} fullWidth>
          <InputLabel>Folder</InputLabel>
          <Select
            value={choice}
            label="Folder"
            onChange={handleChange}
          >
            {folders.map((record) => 
              <MenuItem value={record.id}>{record.folder_name}</MenuItem>
            )}
          </Select>
        </FormControl>
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
          <Button onClick={moveFolder}>Move the folder</Button>
        </DialogActions>
      </Dialog>
      </>
      
    );
  }
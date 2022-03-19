import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';import ContentCopy from '@mui/icons-material/ContentCopy';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import Button from '@mui/material/Button';

import "../index.css"

export default function LeftBar() {

  const APIHost = React.useContext(APIHostContext)

  React.useEffect(() => {
  }, []);

    return (
      <>
      
      <div className='leftBar'>
      <MenuList>
        <MenuItem>
        <Button  className='btnHeader' startIcon={<FileUploadOutlinedIcon />}>
          Upload a new file
        </Button>  
        </MenuItem>
            
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <CloudOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>My Drive</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FolderSharedOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Shared with me</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <InfoOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
      </MenuList>
      </div>
      </>
      
    );
  }
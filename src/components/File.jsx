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
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import "../index.css"

export default function File() {

  const APIHost = React.useContext(APIHostContext)

  React.useEffect(() => {
  }, []);

    return (
      <>
      <MenuList>     
        <MenuItem>
          <ListItemIcon>
            <CloudOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>My Drive</ListItemText>
          <span>dhh</span><span>dhh</span><span>dhh</span>
        </MenuItem>
       
        <Divider />
 
      </MenuList>
      </>
      
    );
  }
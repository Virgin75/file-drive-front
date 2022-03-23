import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';


import "../index.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import FolderActionsMenu from '../components/FolderActionsMenu'
import FileActionsMenu from './FileActionsMenu';
  
  export default function FilesAndFoldersList(props) {
    const APIHost = React.useContext(APIHostContext)
    const navigate = useNavigate();
    
   

    function createData(isFolder, name, type, size, edit_date, dl_link, more, id) {
      return { isFolder, name, type, size, edit_date, dl_link, more, id };
    }
    
    function getDownloadLink(param) {
      return <IconButton className="btnHeader" href={APIHost + param} color="primary" aria-label="ffd">
                  <FileDownloadOutlinedIcon fontSize="medium"/>
              </IconButton>
    }
    function getMore(contentType, id) {
      if (contentType == 'folder') {
        return <FolderActionsMenu id={id}/>
      }
      else if (contentType == 'file') {
        return <FileActionsMenu id={id}/>
      }
      
    }
  
    function isFolder(bool, thumbnail) {
      if (bool) {
          return <FolderOutlinedIcon color="primary" fontSize="large"/>
      }
      else {
          return <img src={APIHost + thumbnail} width="50" height="50"/>
      }
    }

    const handleRowClick = (id) => {
      navigate("/folders/" + id + '/', { replace: true });
    }
  
    const file_rows = [];
    const folder_rows = [];

    // Create lines for folders
    for (let i = 0; i < props.folders.length; i++) {
      folder_rows.push(
        createData(isFolder(true, ''), props.folders[i].folder_name, '', '', '', '', getMore("folder", props.folders[i].id), props.folders[i].id)
      )
    }

    // Create lines for files
    for (let i = 0; i < props.files.length; i++) {
      //reformat date
      let date = new Date(props.files[i].updated_at);
      let ndate = date.toLocaleString('en-US', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
        second: 'numeric', // numeric, 2-digit
    })
      console.log(ndate)

      file_rows.push(
        createData(isFolder(false, props.files[i].thumbnail), props.files[i].file_name, props.files[i].file_type, props.files[i].file_size.toFixed(2) + ' mb', ndate, getDownloadLink(props.files[i].download_url), getMore("file", props.files[i].id),  props.files[i].id)
      )
    }

    const renderRows = (row) => {
      // It's a file
      if(row.file_name != undefined || row.file_name != '') {
        return <></>
      } 
      // It's a folder
      else {
        return  
      }
    }

    return (
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">File type</TableCell>
              <TableCell align="right">Disk size (mb)</TableCell>
              <TableCell align="right">Last edited on:</TableCell>
              <TableCell align="right">Download file</TableCell>
              <TableCell align="right">More actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {folder_rows.map((row) => (
              
              <TableRow
                hover={true}
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell onClick={() => handleRowClick(row.id)} sx={{ width: '25px', cursor: 'pointer'}} align="center">{row.isFolder}</TableCell>
                <TableCell onClick={() => handleRowClick(row.id)} sx={{ cursor: 'pointer'}} component="th" scope="row">
                  <b>{row.name}</b>
                </TableCell>
                <TableCell onClick={() => handleRowClick(row.id)} sx={{ cursor: 'pointer'}} align="right">{row.type}</TableCell>
                <TableCell onClick={() => handleRowClick(row.id)} sx={{ cursor: 'pointer'}} align="right">{row.size}</TableCell>
                <TableCell onClick={() => handleRowClick(row.id)} sx={{ cursor: 'pointer'}} align="right">{row.edit_date}</TableCell>
                <TableCell sx={{ width: '90px'}} align="center">{row.dl_link}</TableCell>
                <TableCell sx={{ width: '90px'}} align="center">{row.more}</TableCell>
              </TableRow>
            ))}
            {file_rows.map((row) => (
              
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ width: '25px'}} align="center">{row.isFolder}</TableCell>
                <TableCell component="th" scope="row">
                  <b>{row.name}</b>
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">{row.edit_date}</TableCell>
                <TableCell sx={{ width: '90px', backgroundColor: '#e3edf7'}} align="center">{row.dl_link}</TableCell>
                <TableCell sx={{ width: '90px'}} align="center">{row.more}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
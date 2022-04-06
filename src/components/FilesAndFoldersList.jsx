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
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import FolderActionsMenu from '../components/FolderActionsMenu'
import FileActionsMenu from './FileActionsMenu';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import GetSharedWithIcon from './GetSharedWithIcon';
import DownloadLink from './DownloadLink';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

  export default function FilesAndFoldersList(props) {
    const APIHost = React.useContext(APIHostContext)
    const navigate = useNavigate();
    

    function createData(isFolder, name, shared_with, type, size, edit_date, dl_link, more, id) {
      return { isFolder, name, shared_with, type, size, edit_date, dl_link, more, id };
    }
    
    function getDownloadLink(param, file_name, file_type) {
      return <DownloadLink 
                link={param} 
                file_name={file_name}
                file_type={file_type}/>
    }

    function getMore(contentType, id) {
      if (contentType == 'folder') {
        return <FolderActionsMenu id={id}/>
      }
      else if (contentType == 'file') {
        return <FileActionsMenu id={id}/>
      }
      
    }

    function getSharedWith(users, type, id) {
        return <>
        <GetSharedWithIcon
          users={users}
          type={type}
          id={id}
        />
        </>
        
      }
      
  
    function isFolder(bool, thumbnail, color) {
      if (bool) {
          return <FolderOutlinedIcon sx={{ color: color }} fontSize="large"/>
      }
      else {
        if (thumbnail != null) {
          return <img src={APIHost + thumbnail} width="50" height="50"/>
        }
        else {
          return <InsertDriveFileOutlinedIcon fontSize="large"/>
        }
      }
    }

    const handleRowClick = (id) => {
      navigate("/folders/" + id + '/', { replace: true });
    }
  
    const file_rows = [];
    const folder_rows = [];

    // Create lines for folders
    for (let i = 0; i < props.folders?.length; i++) {
      folder_rows.push(
        createData(isFolder(true, '', props.folders[i].color), props.folders[i].folder_name, getSharedWith(props.folders[i].shared_with_users, 'folder', props.folders[i].id), '', '', '', '', getMore("folder", props.folders[i].id), props.folders[i].id)
      )
    }

    // Create lines for files
    for (let i = 0; i < props.files?.length; i++) {
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
        createData(isFolder(false, props.files[i].thumbnail, ''), props.files[i].file_name, getSharedWith(props.files[i].shared_with_users, 'file', props.files[i].id), props.files[i].file_type, props.files[i].file_size.toFixed(2) + ' mb', ndate, getDownloadLink(props.files[i].download_url, props.files[i].file_name, props.files[i].file_type), getMore("file", props.files[i].id),  props.files[i].id)
      )
    }

    const renderTable = () => {
      // There is nothing to display
      if(file_rows.length == 0 && folder_rows.length == 0) {
        return <div className="empty">
            <Inventory2OutlinedIcon fontSize="large" />
            <span className="emptyword">This folder is empty...</span>
          </div>
      } 
      // Display the data
      else {
        return  <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              {props.showShareColumn && <TableCell align="right">Share</TableCell>}
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
                {props.showShareColumn && <TableCell sx={{ cursor: 'pointer'}} align="right">{row.shared_with}</TableCell>}
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
                {props.showShareColumn && <TableCell align="right">{row.shared_with}</TableCell>}
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
      }
    }

    return (
      <>
        {renderTable()}
      </>
    );
  }
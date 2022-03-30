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
import IconButton from '@mui/material/IconButton';
import FolderActionsMenu from '../components/FolderActionsMenu'
import FileActionsMenu from './FileActionsMenu';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PeopleIcon from '@mui/icons-material/People';
import Tooltip from '@mui/material/Tooltip';
import ShareFolderWithModal from './ShareFolderWithModal';
import ShareFileWithModal from './ShareFileWithModal';

  export default function FilesAndFoldersList(props) {
    const APIHost = React.useContext(APIHostContext)
    const navigate = useNavigate();
    const [openModalShareFolder, setOpenModalShareFolder] = React.useState(false);
    const [openModalShareFile, setOpenModalShareFile] = React.useState(false);


    function createData(isFolder, name, shared_with, type, size, edit_date, dl_link, more, id) {
      return { isFolder, name, shared_with, type, size, edit_date, dl_link, more, id };
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

    function getSharedWith(users, type, id) {
      if (users.length == 0) {
        switch (type) {
          case 'file':
            return <><Tooltip title="Share this file with another user">
              <IconButton onClick={() => setOpenModalShareFile(true)} className="btnHeader" color="primary">
              <GroupAddOutlinedIcon />
              </IconButton>
              </Tooltip>
              <ShareFileWithModal 
                  open={openModalShareFile} 
                  handleClose={() => setOpenModalShareFile(false)} 
                  id={id}/>
              </>
          case 'folder':
              return <><Tooltip title="Share this folder with another user">
              <IconButton onClick={() => setOpenModalShareFolder(true)} className="btnHeader" color="primary">
              <GroupAddOutlinedIcon />
              </IconButton>
              </Tooltip>
              <ShareFolderWithModal 
                  open={openModalShareFolder} 
                  handleClose={() => setOpenModalShareFolder(false)} 
                  id={id}/>
              </>
        }
        
      }
      else {
        return <Tooltip title={'Currently shared with ' + users.length + ' user(s)'}><IconButton className="btnHeader" color="secondary">
           <PeopleIcon />
        </IconButton>
        </Tooltip>
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
    for (let i = 0; i < props.folders?.length; i++) {
      folder_rows.push(
        createData(isFolder(true, ''), props.folders[i].folder_name, getSharedWith(props.folders[i].shared_with_users, 'folder', props.folders[i].id), '', '', '', '', getMore("folder", props.folders[i].id), props.folders[i].id)
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
        createData(isFolder(false, props.files[i].thumbnail), props.files[i].file_name, getSharedWith(props.files[i].shared_with_users, 'file', props.files[i].id), props.files[i].file_type, props.files[i].file_size.toFixed(2) + ' mb', ndate, getDownloadLink(props.files[i].download_url), getMore("file", props.files[i].id),  props.files[i].id)
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
      <>
      <TableContainer component={Paper}>
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
      
      </>
    );
  }
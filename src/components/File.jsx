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
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

function createData(isFolder, name, type, size, edit_date, dl_link, more) {
    return { isFolder, name, type, size, edit_date, dl_link, more };
  }
  
  function getDownloadLink(param) {
    return <IconButton className="btnHeader" href="#" color="primary" aria-label="ffd">
                <FileDownloadOutlinedIcon fontSize="medium"/>
            </IconButton>
  }
  function getMore(param) {
    return <IconButton className="btnHeader" color="secondary" aria-label="ffd">
                <MoreVertOutlinedIcon fontSize="medium"/>
            </IconButton>
  }

  function isFolder(param) {
    if (param) {
        return <FolderOutlinedIcon color="primary" fontSize="medium"/>
    }
    else {
        return 
    }
  }

  const rows = [
    createData(isFolder(true), 'Frozen yoghurt.png', 'image/png', '0.7 Mb', '21/11/2022', getDownloadLink(), getMore()),
    createData(isFolder(false), 'Ice cream sandwich', 237, 9.0),
  ];
  
  export default function File(thumbnail, name, type, size, edit_date, dl_link) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#fafafa'}}>
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
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
import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';



import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';import IconButton from '@mui/material/IconButton';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';import Settings from '@mui/icons-material/Settings';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteFileModal from './DeleteFileModal';
import RenameFileModal from './RenameFileModal';
import ShareFileWithModal from './ShareFileWithModal';
import MoveFileModal from './MoveFileModal';

  export default function FileActionsMenu(props) {
    const APIHost = React.useContext(APIHostContext)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModalDeleteFile, setOpenModalDeleteFile] = React.useState(false);
    const [openModalRenameFile, setOpenModalRenameFile] = React.useState(false);
    const [openModalShareFile, setOpenModalShareFile] = React.useState(false);
    const [openModalMoveFile, setOpenModalMoveFile] = React.useState(false);

    const openMore = Boolean(anchorEl);
    
    const handleClickMore = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMore = () => {
      setAnchorEl(null);
    };
  

    const handleClickOpenDeleteFile = () => {
      setOpenModalDeleteFile(true);
    };    
    const handleCloseDeleteFile = () => {
      setOpenModalDeleteFile(false);
    };

    const handleClickOpenRenameFile = () => {
        setOpenModalRenameFile(true);
      };    
    const handleCloseRenameFile = () => {
        setOpenModalRenameFile(false);
      };

    const handleClickOpenShareFile = () => {
        setOpenModalShareFile(true);
      };    
    const handleCloseShareFile = () => {
        setOpenModalShareFile(false);
      };

      const handleClickOpenMoveFile = () => {
        setOpenModalMoveFile(true);
      };    
      const handleCloseMoveFile = () => {
        setOpenModalMoveFile(false);
      };
    
    return (
        <>
        <IconButton  onClick={handleClickMore} className="btnHeader" color="secondary" aria-label="ffd">
                    <MoreVertOutlinedIcon fontSize="medium"/>
                </IconButton>
                <Menu
          anchorEl={anchorEl}
          id="actions-menu"
          open={openMore}
          onClose={handleCloseMore}
          onClick={handleCloseMore}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 3px 3px rgba(0,0,0,0.16))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClickOpenRenameFile}>
            <ListItemIcon>
              <DriveFileRenameOutlineOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Rename file
          </MenuItem>
          <MenuItem onClick={handleClickOpenMoveFile}>
            <ListItemIcon>
              <DriveFileMoveOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Move this file to...
          </MenuItem>
          <MenuItem  onClick={handleClickOpenShareFile}>
            <ListItemIcon>
              <ShareOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Share this file with...
          </MenuItem>
          <MenuItem onClick={handleClickOpenDeleteFile} sx={{backgroundColor: '#ffedee'}}>
            <ListItemIcon>
              <BackspaceOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Delete file
          </MenuItem>
        </Menu>
        <DeleteFileModal 
            open={openModalDeleteFile} 
            handleClose={handleCloseDeleteFile} 
            id={props.id}/>
        <RenameFileModal 
            open={openModalRenameFile} 
            handleClose={handleCloseRenameFile} 
            id={props.id}/>
        <ShareFileWithModal 
            open={openModalShareFile} 
            handleClose={handleCloseShareFile} 
            id={props.id}/>
        <MoveFileModal 
            open={openModalMoveFile} 
            handleClose={handleCloseMoveFile} 
            id={props.id}/>
    </>
    );
  }
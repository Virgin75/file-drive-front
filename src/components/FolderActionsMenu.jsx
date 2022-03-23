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
import DeleteFolderModal from './DeleteFolderModal';
import RenameFolderModal from './RenameFolderModal';
import ShareFolderWithModal from './ShareFolderWithModal';
import MoveFolderModal from './MoveFolderModal';

  export default function FolderActionsMenu(props) {
    const APIHost = React.useContext(APIHostContext)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModalDeleteFolder, setOpenModalDeleteFolder] = React.useState(false);
    const [openModalRenameFolder, setOpenModalRenameFolder] = React.useState(false);
    const [openModalShareFolder, setOpenModalShareFolder] = React.useState(false);
    const [openModalMoveFolder, setOpenModalMoveFolder] = React.useState(false);

    const openMore = Boolean(anchorEl);
    
    const handleClickMore = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMore = () => {
      setAnchorEl(null);
    };
  

    const handleClickOpenDeleteFolder = () => {
      setOpenModalDeleteFolder(true);
    };    
    const handleCloseDeleteFolder = () => {
      setOpenModalDeleteFolder(false);
    };

    const handleClickOpenRenameFolder = () => {
        setOpenModalRenameFolder(true);
      };    
    const handleCloseRenameFolder = () => {
        setOpenModalRenameFolder(false);
      };

    const handleClickOpenShareFolder = () => {
        setOpenModalShareFolder(true);
      };    
    const handleCloseShareFolder = () => {
        setOpenModalShareFolder(false);
      };

      const handleClickOpenMoveFolder = () => {
        setOpenModalMoveFolder(true);
      };    
      const handleCloseMoveFolder = () => {
        setOpenModalMoveFolder(false);
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
          <MenuItem onClick={handleClickOpenRenameFolder}>
            <ListItemIcon>
              <DriveFileRenameOutlineOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Rename folder
          </MenuItem>
          <MenuItem onClick={handleClickOpenMoveFolder}>
            <ListItemIcon>
              <DriveFileMoveOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Move this folder to...
          </MenuItem>
          <MenuItem  onClick={handleClickOpenShareFolder}>
            <ListItemIcon>
              <ShareOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Share this folder with...
          </MenuItem>
          <MenuItem onClick={handleClickOpenDeleteFolder} sx={{backgroundColor: '#ffedee'}}>
            <ListItemIcon>
              <BackspaceOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Delete folder
          </MenuItem>
        </Menu>
        <DeleteFolderModal 
            open={openModalDeleteFolder} 
            handleClose={handleCloseDeleteFolder} 
            id={props.id}/>
        <RenameFolderModal 
            open={openModalRenameFolder} 
            handleClose={handleCloseRenameFolder} 
            id={props.id}/>
        <ShareFolderWithModal 
            open={openModalShareFolder} 
            handleClose={handleCloseShareFolder} 
            id={props.id}/>
        <MoveFolderModal 
            open={openModalMoveFolder} 
            handleClose={handleCloseMoveFolder} 
            id={props.id}/>
    </>
    );
  }
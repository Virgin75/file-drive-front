import React from 'react';
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
import { useNavigate } from 'react-router-dom';
import HelpModal from '../components/HelpModal'
import UploadFileModal from '../components/UploadFileModal'

export default function LeftBar(props) {

  const APIHost = React.useContext(APIHostContext)
  const navigate = useNavigate();
  const [openHelpModal, setOpenHelpModal] = React.useState(false);
  const [openFileUploadModal, setOpenFileUploadModal] = React.useState(false);



    const goToMyDrive = () => {
      navigate("/my-drive", { replace: true });
    }

    const goToSharedFiles = () => {
      navigate("/shared-with-me", { replace: true });
    }

    const handleClickOpenHelpModal = () => {
      setOpenHelpModal(true);
    };    
    const handleCloseHelpModal = () => {
      setOpenHelpModal(false);
    };

    const handleClickOpenFileUploadModal = () => {
      setOpenFileUploadModal(true);
    };    
    const handleCloseFileUploadModal = () => {
      setOpenFileUploadModal(false);
    };

    return (
      <>
      
      <MenuList>
        <MenuItem onClick={handleClickOpenFileUploadModal}>
        {(() => {
          if (props.currentFolder) {
            return <Button  className='btnHeader' startIcon={<FileUploadOutlinedIcon />}>
            Upload a new file
          </Button>  
          } else {
            return <></>;
          }
        })()}
        
        </MenuItem>
            
        <Divider />
        <MenuItem onClick={goToMyDrive}>
          <ListItemIcon>
            <CloudOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>My Drive</ListItemText>
        </MenuItem>
        <MenuItem onClick={goToSharedFiles}>
          <ListItemIcon>
            <FolderSharedOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Shared with me</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClickOpenHelpModal}>
          <ListItemIcon>
            <InfoOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
      </MenuList>
      <HelpModal 
            open={openHelpModal} 
            handleClose={handleCloseHelpModal}/>
      <UploadFileModal 
            open={openFileUploadModal} 
            handleClose={handleCloseFileUploadModal}
            currentFolder={props.currentFolder}/>
      </>
      
    );
  }
import React from 'react';
import IconButton from '@mui/material/IconButton';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PeopleIcon from '@mui/icons-material/People';
import Tooltip from '@mui/material/Tooltip';
import ShareFolderWithModal from './ShareFolderWithModal';
import ShareFileWithModal from './ShareFileWithModal';
import SharedWithModal from './SharedWithModal';

  export default function GetSharedWithIcon(props) {
    const [openModalShareFolder, setOpenModalShareFolder] = React.useState(false);
    const [openModalShareFile, setOpenModalShareFile] = React.useState(false);
    const [openModalSharedWith, setOpenModalSharedWith] = React.useState(false);


    function getSharedWith() {
      if (props.users.length == 0) {
        switch (props.type) {
          case 'file':
            return <><Tooltip title="Share this file with another user">
              <IconButton onClick={() => setOpenModalShareFile(true)} className="btnHeader" color="primary">
              <GroupAddOutlinedIcon />
              </IconButton>
              </Tooltip>
              <ShareFileWithModal 
                  open={openModalShareFile} 
                  handleClose={() => setOpenModalShareFile(false)} 
                  id={props.id}/>
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
                  id={props.id}/>
              </>
        }
        
      }
      else {
        return <><Tooltip title={'Currently shared with ' + props.users.length + ' user(s)'}>
          <IconButton onClick={() => setOpenModalSharedWith(true)} className="btnHeader" color="secondary">
           <PeopleIcon />
        </IconButton>
        </Tooltip>
        <SharedWithModal
            open={openModalSharedWith} 
            handleClose={() => setOpenModalSharedWith(false)}
            users={props.users}
            type={props.type}
            id={props.id}/>
        </>
      }
    }
  
    return (
      <>
      {getSharedWith()}
      </>
    );
  }
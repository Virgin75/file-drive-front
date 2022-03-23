import React, { useEffect, useState } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function HelpModal(props) {
  const APIHost = React.useContext(APIHostContext)

    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>About this app</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This web app was designed with Python, Django, Javascript and React. More info to come...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </>
      
    );
  }
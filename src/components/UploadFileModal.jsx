import React, { useContext } from 'react';
import UpdateListContext from '../UpdateListContext';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function UploadFileModal(props) {

  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [file, setFile] = React.useState();
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  const { needsUpdate, setNeedsUpdate } = useContext(UpdateListContext);

  React.useEffect(() => {
    setIsFileSelected(false)
    setIsLoading(false)
  }, [props.open]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const uploadFile = () => {
    setIsLoading(true)
    console.log(props.currentFolder)
    const user = localStorage.getItem("user");

      const headers = {
        "Authorization": 'Bearer ' + user,
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", file.name);
      formData.append("parent_folder", props.currentFolder);

      const params = {
        method: 'POST',
        headers: headers,
        body: formData
      }
      

      fetch(APIHost + '/api/files/', params)
        .then(results => results.json())
        .then(data => {
          setIsLoading(false)
          props.handleClose()
          //Update the files and folders list
          setNeedsUpdate(!needsUpdate)
        });
  };


    return (
      <>
       <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Upload a new file to your drive</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a file below:
          </DialogContentText>
          <label htmlFor="contained-button-file">
            <input
              type="file"
              onChange={handleChange} />
          </label>
          <DialogContentText sx={{marginTop: '10px'}}>
            This file will be uploaded to the folder you are viewing right now.
          </DialogContentText>
           <div>
            {isLoading ? (
              <Rings color="#00BFFF" height={150} width={150} />
            ) : (
              <></>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          {isFileSelected 
          ? (<Button onClick={uploadFile}>UPLOAD THE FILE</Button>) 
          : (<Button disabled onClick={uploadFile}>UPLOAD THE FILE</Button>)
          }
          
        </DialogActions>
      </Dialog>
      </>
      
    );
  }
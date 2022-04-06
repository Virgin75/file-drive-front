import React, { useContext } from 'react';
import {APIHostContext} from '../APIHostContext';
import { Rings } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import FilesAndFoldersList from '../components/FilesAndFoldersList';
import UpdateListContext from '../UpdateListContext';


export default function SharedWithMeView(props) {
  const APIHost = React.useContext(APIHostContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [folders, setFolders] = React.useState([])
  const [files, setFiles] = React.useState([])
  const { needsUpdate } = useContext(UpdateListContext);

  const navigate = useNavigate();


  React.useEffect(() => {
    // Set user token from local storage
    const user = localStorage.getItem("user");
    console.log(user)
    if (user == '') {
      navigate("/login", { replace: true });
    }
    else {
      setIsLoading(true)

      const headers = {
        "content-Type":'application/json',
        "Authorization": 'Bearer ' + user,
      }
      const options = {
        method: 'GET',
        headers: headers
      }
      // Get content in root folder
      fetch(APIHost + '/api/shared-with-me/', options)
      .then(results => results.json())
      .then(data => {

       let sh_files = []
       let sh_folders = []

        for (let i = 0; i < data?.length; i++) {
          if (data[i].file != null) {
            console.log('data' + data[i].file)
            sh_files.push(data[i].file)
          }
          if (data[i].folder != null) {
            sh_folders.push(data[i].folder)
          }
        }

        setIsLoading(false)
        setFolders(sh_folders)
        setFiles(sh_files)
      });
    }
   
  }, [needsUpdate]);


  const DisplayContent = () => {
    return <>
    <div className='twoSections'>
      <div className="left">
        <LeftBar/>
      </div>
      <div className="right">
        <div className='topSection'>
        
        <h1>🔗 Folders and files shared with you</h1>
        </div>
        <FilesAndFoldersList 
          files={files} 
          folders={folders} 
          showShareColumn={false}/>
       
        <div>
            {isLoading ? (
              <Rings color="#00BFFF" height={150} width={150} />
            ) : (
              <></>
            )}
          </div>
      </div>
    </div>
    </>
  }
    return (
      <>
      <Header />
      <DisplayContent />  
      </>
      
    );
  }
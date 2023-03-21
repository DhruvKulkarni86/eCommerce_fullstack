import React, { useEffect, useState,forwardRef } from 'react';
import useStorage from '../hooks/useStorage';
import { Box, LinearProgress, Snackbar, Typography} from '@mui/material';
import MuiAlert from "@mui/material/Alert";


const ProgressBar = ({ file, setURL, setProgress }) => {
const [firebaseError, setFirebaseError] = useState(null) 
const [snackState, setSnackState] = useState(true)

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


  const { progress, url, error } = useStorage(file);
  useEffect(() => {
    if (url) {
      setURL(url)
      setProgress(parseFloat(progress).toFixed(2))
    } else setURL("")
  }, [url, setURL, setProgress, progress])


useEffect(() => {
  if(error){
    console.log("Progressbar",error);
    setFirebaseError(error)
  }else setFirebaseError(null)
},[error, setFirebaseError])

  const handleSnackClose = () => {
    setSnackState(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'flex-end', gap:'10px'}}>
      <Box sx={{
        }}>
          {firebaseError === null ? <><Typography fontSize='small' sx={{fontSize:12}}>{file.name}</Typography><LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            color: 'primary',
          }} /><Typography variant='caption' sx={{display:'flex', justifyContent:'flex-end'}}>{progress === 100 ? '✔' : progress +"%"}</Typography></>:
          <Snackbar
          open={snackState}
          autoHideDuration={5000}
          onClose={handleSnackClose}
          > 
          <Alert severity="error" sx={{ width: "100%" }}>
          You are unautorized! If you are a admin try logging in again.
        </Alert>
        </Snackbar>}
      </Box>
    </Box>
  )
}

export default ProgressBar;

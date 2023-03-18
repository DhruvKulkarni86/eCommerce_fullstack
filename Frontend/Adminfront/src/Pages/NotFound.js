import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useLocation, useNavigate} from 'react-router-dom';

const NotFound = () => {

  const location = useLocation()
  const navigate = useNavigate()


  return (
  <>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        justifyContent:'center',
        minHeight:'100vh'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center'
          }}
        >
          {location.state === true ? 
          <Typography
          align='center'
          variant='h2'
          sx={{fontWeight:'bold'}}
          >
            401: Authorization required
          </Typography>: 
          <Typography
            align="center"
            variant="h2"
          sx={{fontWeight:'bold'}}
          >
            404: The page you are looking for isn't here
          </Typography>
          }

          <Typography
          sx={{py:3, fontWeight:'medium'}}
            align="center"
            variant="body1"
          >
           Seems you came here by mistake.
          </Typography>

          {location.state === true ? 
          <Button
          component="a"
          startIcon={(<ArrowBackIcon fontSize="small" />)}
          sx={{ mt: 3 }}
          variant="contained" 
          color='primary'
          onClick={()=> navigate('/login')}
          >
            GO BACK TO Login
          </Button>
          :
          <Button
          component="a"
          startIcon={(<ArrowBackIcon fontSize="small" />)}
          sx={{ mt: 3 }}
          variant="contained" 
          color='primary'
          onClick={()=> navigate('/')}
          >
            GO BACK TO Dashboard
          </Button>
          }
        </Box>
      </Container>
    </Box>
  </>
  )
};

export default NotFound;
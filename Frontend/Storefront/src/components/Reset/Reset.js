import React, {useState} from 'react'
import { ThemeProvider } from '@mui/system'
import { Fab, Container, Box, Avatar, Typography, TextField, Button, Stack, Alert } from '@mui/material'
import StoreTheme from '../../themes/StoreTheme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockResetIcon from '@mui/icons-material/LockReset';
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { auth } from '../../firebase/config'

const validationSchema = yup.object({
    email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
});

const Reset = () => {
    let navigate = useNavigate();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [conf, setConf] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(values.email);
            setLoading(true)
            auth.sendPasswordResetEmail(values.email)
            .then(()=>{
                console.log('sent');
                setLoading(false)
                setConf('Password reset link sent to email!')
            })
            .catch((error)=>{
                setLoading(false)
                console.log(error);
                setError('User does not exist!')
            })
        },
    });

    const goBack = () => {
        navigate('/store',  {replace:true})
    }
    return (
        <ThemeProvider theme={StoreTheme}>
            <Fab 
            onClick={goBack}
            color="primary" 
            size="small" 
            variant='extended' 
            aria-label="back"
            sx={{mt:1, ml:1, display:{xs:'none', sm:'flex'}}} >
                    <ArrowBackIcon sx={{mr:0.5}} />
                    Go Back
            </Fab>
            <Fab onClick={goBack} color="primary" size="small" aria-label="back"  sx={{mt:1, ml:1, display:{xs:'flex', sm:'none'}}} >
                <CloseIcon />
            </Fab>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2, width:'100%' }}>
                        <Stack direction='column' spacing={2} sx={{width:'100%'}}>
                            <TextField
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                // error
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                id="email"
                                name="email"
                                label="Enter your email"
                                autoComplete="email"
                            />
                            <Button type='submit' disabled={loading} variant='contained'>
                                Submit
                            </Button>
                            {error &&
                                <Alert severity='error'>{error}</Alert>
                            }
                            {conf &&
                                <Alert severity='success'>{conf}</Alert>
                            }
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Reset
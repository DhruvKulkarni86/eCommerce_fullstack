import React, {useState} from 'react';
import { Avatar, Stack, Button, CircularProgress, TextField, Grid, Box, Typography, Container, Link, Alert, Fab, IconButton, Tooltip } from '@mui/material' 
import { ThemeProvider } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { authLogout } from '../services/Functions/AuthFunc';
import StoreTheme from '../themes/StoreTheme';
import { logout } from '../features/user';
import GoogleIcon from '../icons/GoogleIcon';
import { requiredField, emailValid, passValid, nameValid } from '../services/Functions/ValidFunc';
import { authGoogleSignIn, authSignupWithEmail } from '../services/Functions/AuthFunc';
import { auth } from '../firebase/config';
import { deleteUser } from 'firebase/auth';

const criteria = "Password Criteria : At least ONE uppercase & lowercase letter, digit, special symbol and GREATER than 5 charachters";

export default function SignUp() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = () => {
        navigate('/store',  {replace:true})
    }

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [fnameErr, setFNameErr] = useState(false);
    const [lnameErr, setLNameErr] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pass, setPass] = useState('');
    const [passErr, setPassErr] = useState(false);
    const [confPass, setConfPass] = useState('');

    const [error, setError] = useState('');
    const [conf, setConf] = useState('');
    const [logLnk, setLogLnk] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlefname = e => setFname(e.target.value);
    const handlelname = e => setLname(e.target.value);
    const handleEmail = e => setEmail(e.target.value);
    const handlePass = e => setPass(e.target.value);
    const handleConf = e => setConfPass(e.target.value);

    async function handleSubmit (event) {
        event.preventDefault();
        setError('')
        setFNameErr(false)
        setLNameErr(false)
        setEmailErr(false)
        setLoading(false)
        setPassErr(false) 

        if (nameValid(fname)===false ){
            return(
                setLoading(false),
                setFNameErr(true)
            )
        }
        if (nameValid(lname)===false){
            return(
                setLoading(false),
                setLNameErr(true)
            )
        }
        if (emailValid(email) !== 'ok' || requiredField(email) === 'Required'){
            return (
                setLoading(false),
                setEmailErr(true)
            )
        }
        if(passValid(pass)===false){
            return(
                setLoading(false),
                setPassErr(true)
            )
        }
        if (pass !== confPass){
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            await authSignupWithEmail(email, pass).then(
                (resp)=>{
                // console.log("GOOGLE RESP", resp);
                const user = resp.user;
                // console.log("SIGN UP USER", user);
                user.sendEmailVerification().then((res)=>{
                    // console.log("VERIF RES", res);
                }).catch((err)=>{console.log("VERIF ERR", err);})
                user.getIdToken().then((token)=>{
                    user.updateProfile({
                        displayName: `${fname} ${lname}`
                    }).then(()=>{
                        console.log("Welcome", user.displayName);
                        axios({
                            url:`${process.env.REACT_APP_BACK_URL}/auth/signup`,
                            headers:{
                                "X-Requested-With": "XMLHttpRequest",
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                            },
                            data:{
                                "FName" : fname,
                                "LName" : lname
                            },
                            method:"POST"
                        }).then((res)=>{
                            // console.log("SERVER RESP", res);
                            if(res.data.message==="SignUp Successful"){
                                setConf(`An email verification link has been sent to ${user.email}.`)
                                setLoading(false)
                                setLogLnk(true)
                                authLogout().then(()=>{
                                    dispatch(logout())
                                }).catch((err)=>console.log("LOGOUT ERR", err.message));
                            }
                            if(res.data.message!=="SignUp Successful"){
                                const user = auth.currentUser;
                                deleteUser(user).then((res)=>{
                                    // console.log("DELETE USER RES", res);
                                    setLoading(false)
                                    setError('Account not created, try again!')
                                }).catch(err=>console.log("DELETE USER ERR", err))
                                //dispatch logout and delete user created from firebase
                            }
                        }).catch(()=>{
                            const user = auth.currentUser;
                            deleteUser(user).then((res)=>{
                                // console.log("DELETE USER RES", res);
                                setLoading(false)
                                setError('Account not created, try again!')
                            }).catch(err=>console.log("DELETE USER ERR", err))
                        })
                    })
                })
            }).catch((err)=>{
                if(err.code === 'auth/email-already-in-use'){
                    setLoading(false)
                    setError("Email already exists, try logging in!")
                }
            })
            }catch{
                setLoading(false)
                setError('Failed to create an account')
            } 
    };

    const googleSubmit = () => {
        authGoogleSignIn().then((resp)=>{
            // console.log("GOOGE RESP", resp);
            const user = resp.user;
                // console.log("SIGN UP USER", user);
                user.getIdToken().then((token)=>{
                    localStorage.setItem("userToken", token)
                    axios({
                        url:`${process.env.REACT_APP_BACK_URL}/auth/gsignup`,
                        headers:{
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": `Bearer ${token}`
                        },
                        method:"POST"
                    }).then((res)=>{
                        // console.log("SERVER RESPONSE", res);
                        navigate("/store", {replace:true})
                    })
                    .catch((err)=>{
                        authLogout().then(()=>{
                            dispatch(logout())
                        }).catch((err)=>console.log("LOGOUT ERR", err.message));
                        console.log("ERROR", err.response);
                        setLoading(false);
                        setError("Failed to log in, try again!")
                    })
                })
        })
    }
return (
    <ThemeProvider theme={StoreTheme}>
        {/* <Link component={RouterLink} to="/store"> */}
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
            <Helmet>
                <title>Sign Up</title>
                <meta name='description' content='Create an account for Balaji Nursery and Farms'/>
            </Helmet>
        {/* </Link> */}
        <Box sx={{display:{xs:'flex', sm:'none'}, justifyContent:'space-between'}}>
            {/* <Link component={RouterLink} to="/store"> */}
                <Fab onClick={goBack} color="primary" size="small" aria-label="back"  sx={{mt:1, ml:1, display:{xs:'flex', sm:'none'}}} >
                        <CloseIcon />
                </Fab>
            {/* </Link> */}
            <Tooltip enterTouchDelay={20} disableFocusListener title={criteria} placement='bottom-start' sx={{display:{xs:'flex', sm:'none'}}}>
                <Fab color="primary" size="small" aria-label="back" sx={{alignSelf:'flex-end',mt:1, mr:1, display:{xs:'flex', sm:'none'}}} >
                        <InfoOutlinedIcon />
                </Fab>
            </Tooltip>
        </Box>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor:"primary.main" }}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <Typography component="h2" variant="body2">
                Balaji Nursey & Farms
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
{/* FirstName */}
                    <Grid item xs={6} sm={6}>
                        <TextField
                            fullWidth
                            value={fname}
                            size="small"
                            onChange={handlefname}
                            error={fnameErr}
                            id="fname"
                            autoComplete="fname"
                            label="First Name"
                            helperText={fnameErr && "Enter a valid name"}
                        />
                    </Grid>
{/* LastName */}
                    <Grid item xs={6} sm={6}>
                        <TextField
                            fullWidth
                            value={lname}
                            size="small"
                            onChange={handlelname}
                            error={lnameErr}
                            id="lname"
                            autoComplete="lname"
                            label="Last Name"
                            helperText={lnameErr && "Enter a valid name"}
                        />
                    </Grid>
{/* Email*/}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            autoComplete="email"
                            value={email}
                            size="small"
                            onChange={handleEmail}
                            error={emailErr}
                            id="email"
                            label="Email"
                            helperText={emailErr && "Enter a valid email"}
                        />
                    </Grid>
{/* Password */}
                    <Grid item xs={12}>
                        <TextField
                            required
                            // fullWidth
                            name="password"
                            error={passErr}
                            helperText={passErr && 'Password criteria not met'}
                            label="Password"
                            size="small"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={pass}
                            onChange={handlePass}
                            sx={{width:{md:'93.5%', xs:'100%'}}}
                        />
                        <Tooltip arrow disableFocusListener title={criteria} placement='right-end' sx={{display:{xs:'none', md:'flex'}}}>
                            <IconButton tabIndex={-1} aria-label="info" sx={{px:0, display:{xs:'none', md:'initial'}}}>
                                        <InfoOutlinedIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            size="small"
                            label="Confirm Password"
                            type="password"
                            id="conf-password"
                            autoComplete="new-password"
                            value={confPass}
                            onChange={handleConf}
                        />
                    </Grid>
                    {error && 
                        <Grid item xs={12}>
                            <Alert severity='error'>{error}</Alert>
                        </Grid>
                    }
                    {conf && 
                        <Grid item xs={12}>
                            <Alert severity='success'>{conf}</Alert>
                        </Grid>
                    }
                </Grid>

                {logLnk===false?
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading?<CircularProgress />:"Sign Up"}
                    </Button>
                    :
                    <Link underline='none' component={RouterLink} to="/signin">
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            LOGIN
                        </Button>
                    </Link>
                }

                    <Stack spacing={1} sx={{width:'100%', alignItems:'center'}}>
                            <Typography component="h6" variant="button">
                                OR
                            </Typography>
                            <Button
                            endIcon={<GoogleIcon/>}
                            onClick={googleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                                Continue With 
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link component={RouterLink} to="/signin">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                    </Stack>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
);
}


import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user';
import { authLogout } from '../services/Functions/AuthFunc';
import { Button, Stack, Typography } from '@mui/material';
import { clearCart } from '../features/cart';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config';

const Dashboard = () => {
    let navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const dispatch = useDispatch();
    const uName = useSelector((state)=>state.user.value.userName);
    const uMail = useSelector((state)=>state.user.value.userEmail);
    const handleLogout = () => {
        authLogout().then(()=>{
            dispatch(logout())
            dispatch(clearCart())
            localStorage.clear()
            navigate("/", {replace:true})
        }).catch((err)=>console.log("LOGOUT ERR", err.message));
    }

    const resetPass = () => {
        auth.sendPasswordResetEmail(uMail)
        .then(()=>{
            authLogout().then(()=>{
                dispatch(logout())
                dispatch(clearCart())
                localStorage.clear()
                navigate("/passRedirect", {replace:true})
            }).catch((err)=>console.log("LOGOUT ERR", err.message));
        })
        .catch((error)=>{
            authLogout().then(()=>{
                dispatch(logout())
                dispatch(clearCart())
                localStorage.clear()
                navigate("/", {replace:true})
            }).catch((err)=>console.log("LOGOUT ERR", err.message));
        })
    }

    return (
        <Stack sx={{width:'100%', height:'90vh', padding:2, justifyContent:'space-between', alignItems:{xs:'center', sm:'initial'}}}>
            <Stack spacing={2}>
                <Typography textAlign={{xs:'center', sm:'initial'}} variant='h1' sx={{fontSize:30, fontWeight:'bold',background: "-webkit-linear-gradient(45deg, #134E5E 24%, #71B280 64%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
                    Welcome, {uName!==null && uName.split(' ')[0]}!
                </Typography>
                <Typography sx={{typography:{xs:'body1', sm:'h6'}}}>
                    Email : {uMail}
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Button variant='contained' onClick={resetPass} sx={{width:200}}>
                    Reset Password
                </Button>
                <Button variant='outlined' onClick={handleLogout} sx={{width:200}}>
                    SIGN OUT
                </Button>
            </Stack>
            
        </Stack>
    )
}
export default Dashboard;
//! SAVE USER TO LOCAL STORAGE OR SUMTHIN
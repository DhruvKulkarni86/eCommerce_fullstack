import React from 'react'
import { Typography, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { authLogout } from '../../services/Functions/AuthFunc';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user';


const LogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        authLogout().then(()=>{
            dispatch(logout())
            navigate('/login')
            localStorage.clear();
        })
    }
    return (
        <Stack direction='row' spacing={2} sx={{width:'100%', border:'0', borderRadius:0.8, paddingX:2, paddingY:1, alignSelf:'center', color:'primary.main', cursor:'pointer',
        transition:'ease-in',
        transitionDuration:'0.1s',
        '&:hover':{
            sm:{transform:'scale(1.03)'},
        }
        }}
        onClick={handleLogout}
        >
            <LogoutIcon sx={{alignSelf:'center'}}/>
            <Typography variant='h6' sx={{fontSize:18, fontFamily:'poppins'}}>
                Logout
            </Typography>
        </Stack>
    )
}

export default LogOut;
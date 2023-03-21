import React from 'react'
import { Typography, Stack, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const NavButton = ({icon, name, nav}) => {
    let navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`${nav}`)
    }

    return (
        <Stack onClick={handleNavigate} direction='row' spacing={2} 
        sx={{width:'100%', border:'0', borderRadius:0.8, paddingX:2, paddingY:1, alignSelf:'center', color:'primary.main', cursor:'pointer',
        transition:'ease-in',
        transitionDuration:'0.1s',
        '&:hover':{
            sm:{transform:'scale(1.03)'},
        }
        }}
        >
            {/* <DashboardIcon sx={{alignSelf:'center'}}/> */}
            <Box sx={{alignSelf:'center', justifyContent:'center'}}>
            {icon}
            </Box>
            <Typography variant='h6' sx={{fontSize:18, fontFamily:'inter'}}>
                {name}
            </Typography>
        </Stack>
    )
}

export default NavButton
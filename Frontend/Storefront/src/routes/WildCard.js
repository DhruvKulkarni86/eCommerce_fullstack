import React from 'react'
import SvgMsg from '../components/SvgMsg'
import { Stack, Link } from '@mui/material'
import svg2 from '../assets/plant3.webp';
import { Link as RouterLink} from 'react-router-dom';

const WildCard = () => {
    return (
        <Stack direction='column' sx={{alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
            <SvgMsg img={svg2} msg='404 - Resource not found!'/>
            <Link component={RouterLink} to="/" sx={{color:'#134e5e'}}> 
                Return Home
            </Link>
        </Stack>
    )
}

export default WildCard
import React from 'react'
import { Stack, Typography, CardMedia } from '@mui/material'
// import img from '../../assets/Frame 2.webp';
import img from '../../assets/final hero.webp';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Hero = () => {
    return (
        <Stack direction={{xs:'column', sm:'row'}} justifyContent='space-between' sx={{width:'100%', height:{xs:'65vh', sm:'30vh', md:'70vh'}, paddingX:{sm:2, xs:0}, marginTop:{xs:2, sm:0}}}>
            <Stack direction='column' spacing={0} sx={{width:'100%', alignSelf:'center', marginLeft:{sm:5, xs:0}}}>
                <Typography variant='h1' sx={{fontWeight:'medium', alignSelf:{sm:'flex-start', xs:'center'}, cursor:'default', background: "-webkit-linear-gradient(75deg, #134E5E 24%, #71B280 64%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily:'Poppins', fontSize:{xs:40, sm:50, md:75} }}>
                    Gandhinagar's
                </Typography>
                <Typography variant='h5' component='div' color='primary' sx={{fontWeight:'regular', alignSelf:{sm:'flex-start', xs:'center'}, cursor:'default', fontSize:{md:30, xs:20}}}>
                    leading nursery, now
                </Typography>
                <Typography variant='h5' component='h3' color='primary' sx={{fontWeight:'medium', cursor:'default', alignSelf:{sm:'flex-start', xs:'center'}, fontSize:{md:55, sm:45, xs:35}, background: "-webkit-linear-gradient(45deg, #71B280 24%, #134E5E 74%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
                    online!
                </Typography>
                <Typography textAlign='center' variant='h1' sx={{
                    fontWeight:'medium', alignSelf:'flex-start', cursor:'default', 
                    color:'primary.main',
                    fontFamily:'Poppins', 
                    fontSize:{md:40, sm:30}, marginTop:8,
                    display:{xs:'none', sm:'block'} 
                }}>
                    Balaji Nursery & Farms
                </Typography>
                <Stack direction='row' spacing={0.5} sx={{display:{xs:'none', sm:'flex'}}}>
                    <LocationOnOutlinedIcon sx={{alignSelf:'center'}} />
                    <Typography variant='h5' component='div' color='primary' sx={{fontWeight:'regular', alignSelf:{sm:'flex-start', xs:'center'}, cursor:'default', fontSize:{sm:20, md:25}, display:{xs:'none', sm:'block'}}}>
                        Gandhinagar, GJ
                    </Typography>
                </Stack>
                
            </Stack>
            <CardMedia component='img' image={img} alt='hero' sx={{transform:'scale(1.04)',width:{sm:'100%', xs:300}, height:420, objectFit:'contain', alignSelf:'center', marginTop:{xs:2, sm:0}}}/>
            <Stack direction='column' spacing={0} sx={{display:{xs:'flex', sm:'none'}}}>
                <Typography textAlign='center' variant='h1' sx={{
                    fontWeight:'medium', alignSelf:'center', cursor:'default', 
                    color:'primary.main',
                    fontFamily:'Poppins', 
                    fontSize:30, marginTop:5,
                    display:{xs:'block', sm:'none'} 
                }}>
                    Balaji Nursery & Farms
                </Typography>
                <Stack direction='row' spacing={0.5} sx={{display:{xs:'flex', sm:'none'}, alignContent:'center', justifyContent:'center'}}>
                    <LocationOnOutlinedIcon sx={{alignSelf:'center'}} />
                    <Typography variant='h5' component='div' color='primary' sx={{fontWeight:'regular', alignSelf:'center', cursor:'default', fontSize:{sm:20, md:25}}}>
                        Gandhinagar, GJ
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Hero

// rgba(79,115,59,1) 24%, rgba(62,162,36,1) 64%
// #4f733b 30%, #3ea224 70%
// rgba(65,121,34,1) 24%, rgba(56,186,22,1) 64%
// #134E5E 24%, #71B280 64%
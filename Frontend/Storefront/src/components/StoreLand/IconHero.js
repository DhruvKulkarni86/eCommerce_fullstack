import React from 'react'
import { Stack, Typography, Avatar } from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

const IconHero = () => {
    return (
        <Stack direction='column' spacing={5} sx={{width:'100%', paddingX:{sm:5}, paddingBottom:2}}>
            <Typography textAlign='center' variant='h1' sx={{
                fontWeight:'medium', alignSelf:'center', cursor:'default', 
                color:'primary.main',
                fontFamily:'Poppins', 
                fontSize:{xs:20, sm:25}, marginTop:0,
            }}>
                Why choose Balaji Nursery & Farms?
            </Typography>
{/* responsive */}
            <Stack justifyContent='space-around' spacing={{xs:2, sm:0}} alignItems='center' direction='column' sx={{display:{sm:'none', xs:'flex'}}}>
                <Stack direction='row' justifyContent='space-around' sx={{width:'100%'}}>
                    <Stack direction='column' alignItems='center' sx={{width:'300px'}}>
                        <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'4px solid', borderColor:'primary.main' }}>
                            <DoneAllOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                        </Avatar>
                        <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:20, fontWeight:'regular', marginTop:1, width:'80%'}}>
                            Trust of 15 years
                        </Typography>
                    </Stack>
                    <Stack direction='column' alignItems='center' sx={{width:'300px'}}>
                        <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'4px solid', borderColor:'primary.main' }}>
                            <SecurityOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                        </Avatar>
                        <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:18, fontWeight:'regular', marginTop:1, width:'80%'}}>
                            Secure Payments
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction='row' justifyContent='space-around' sx={{width:'100%'}}>
                    <Stack direction='column' alignItems='center'sx={{width:'300px'}}>
                        <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'4px solid', borderColor:'primary.main' }}>
                            <LocalShippingOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                        </Avatar>
                        <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:20, fontWeight:'regular', marginTop:1, width:'80%'}}>
                            Quality & Safe shipping
                        </Typography>
                    </Stack>
                    <Stack direction='column' alignItems='center' sx={{width:'300px'}}>
                        <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'4px solid', borderColor:'primary.main' }}>
                            <CurrencyRupeeOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                        </Avatar>
                        <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:20, fontWeight:'regular', marginTop:1, width:'80%'}}>
                            Best price guarantee
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
{/* responsiveEnd */}
            <Stack direction='row' justifyContent='space-around' sx={{display:{xs:'none', sm:'flex'}, width:'100%'}}>
                <Stack direction='column' alignItems='center' sx={{width:'300px'}}>
                    <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'5px solid', borderColor:'primary.main' }}>
                        <DoneAllOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                    </Avatar>
                    <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:20, fontWeight:'medium', marginTop:1, width:'80%'}}>
                        Trust of 15 years
                    </Typography>
                </Stack>
                <Stack direction='column' alignItems='center' sx={{width:'300px'}}>
                    <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'5px solid', borderColor:'primary.main' }}>
                        <SecurityOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                    </Avatar>
                    <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:20, fontWeight:'medium', marginTop:1, width:'80%'}}>
                        Secure Payments
                    </Typography>
                </Stack>
                <Stack direction='column' alignItems='center'sx={{width:'300px'}}>
                    <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'5px solid', borderColor:'primary.main' }}>
                        <LocalShippingOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                    </Avatar>
                    <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:20, fontWeight:'medium', marginTop:1, width:'80%'}}>
                        Quality & Safe shipping
                    </Typography>
                </Stack>
                <Stack direction='column' alignItems='center' sx={{width:'300px'}}>
                    <Avatar sx={{ width: 80, height: 80, backgroundColor:'#fff', border:'5px solid', borderColor:'primary.main' }}>
                        <CurrencyRupeeOutlinedIcon sx={{fontSize:40, color:'primary.main'}}/>
                    </Avatar>
                    <Typography textAlign='center' color='primary' variant='h5' sx={{fontSize:20, fontWeight:'medium', marginTop:1, width:'80%'}}>
                        Best price guarantee
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default IconHero
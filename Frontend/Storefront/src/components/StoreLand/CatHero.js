import React from 'react'
import { Stack, Typography, Button ,Box, Divider, Avatar, Link } from '@mui/material'
import Inventory from '@mui/icons-material/Inventory';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { checked } from '../../features/filter';
import {skip} from '../../features/skip';

const plantImg = 'https://images.unsplash.com/photo-1615213861173-21494d7354de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
const seedImg = 'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
const planterImg='https://images.unsplash.com/photo-1554577621-1a3def0b656c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
const careImg='https://images.unsplash.com/photo-1598865306419-16d21664493d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'


const CatHero = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCatalogue = () => {
        dispatch(checked({
            filters:null,
        }))
        dispatch(skip({
            skip:false
        }))
        navigate('/store/catalogue', {replace:true})
    }
    return (
        <Stack direction='column' spacing={5} justifyContent='space-around' sx={{width:'100%', backgroundColor:'primary.main', paddingX:{sm:5}, paddingY:{xs:1, sm:4}}}>
                <Stack direction='column' spacing={2}>
                    <Typography variant='h4' textAlign='center' color='#fff' sx={{alignSelf:'center', cursor:'default', fontSize:20, fontWeight:'regular', width:'90%', display:{xs:'none', sm:'block'}}}>      
                        Explore a curated collection of the finest plants & related gardening tools
                    </Typography>
                    <Box sx={{width:'fit-content', alignSelf:'center'}}>
                        <Button onClick={handleCatalogue} variant='outlined' color='cardBack' startIcon={<Inventory/>} sx={{fontSize:{xs:20, sm:18}}}>
                            View catalogue
                        </Button>
                    </Box>
                </Stack>
                <Box sx={{width:'30%', alignSelf:'center'}}>
                    <Divider flexItem sx={{color:'#fff', 
                        "&.MuiDivider-root": {
                            "&::before": {
                            borderTop: "thin solid white"
                            },
                            "&::after": {
                            borderTop: "thin solid white"
                            }
                        }
                    }}>
                        OR
                    </Divider>
                </Box>
                <Typography variant='h4' textAlign='center' color='#fff' sx={{alignSelf:'center', cursor:'default', fontSize:20, fontWeight:'regular', width:{sm:'80%', xs:'100%'}}}>
                    Shop across following categories
                </Typography>
{/* Responsive */}
                <Stack justifyContent='space-around' spacing={{xs:2, sm:0}} alignItems='center' direction='column' sx={{display:{sm:'none', xs:'flex'}}}>
                    <Stack direction='row' justifyContent='space-around' sx={{width:'100%'}}>
                        <Link component={RouterLink} to={`/store/cat/Plant`} underline='none'>
                            <Stack direction='column' alignItems='center'>
                                <Avatar alt='plants' src={plantImg} sx={{ width: 120, height: 120 }}/>
                                <Typography color='#fff' variant='h5' sx={{fontSize:20, marginTop:1}}>
                                    Plants
                                </Typography>
                            </Stack>
                        </Link>
                        <Link component={RouterLink} to={`/store/cat/Seeds`} underline='none'>   
                        <Stack direction='column' alignItems='center'>
                            <Avatar alt='seeds' src={seedImg} sx={{ width: 120, height: 120 }}/>
                            <Typography color='#fff' variant='h5' sx={{fontSize:20, marginTop:1}}>
                                Seeds
                            </Typography>
                        </Stack>
                        </Link>
                    </Stack>
                    <Stack direction='row' justifyContent='space-around' sx={{width:'100%', paddingBottom:2}}>
                        <Link component={RouterLink} to={`/store/cat/Planters`} underline='none'>   
                        <Stack direction='column' alignItems='center'>
                            <Avatar src={planterImg} sx={{ width: 120, height: 120 }} alt='planters'/>
                            <Typography color='#fff' variant='h5' sx={{fontSize:20, marginTop:1}}>
                                Planters
                            </Typography>
                        </Stack>
                        </Link>
                        <Link component={RouterLink} to={`/store/cat/Care`} underline='none'>   
                        <Stack direction='column' alignItems='center'>
                            <Avatar src={careImg} sx={{ width: 120, height: 120 }} alt='care' />
                            <Typography color='#fff' variant='h5' sx={{fontSize:20, marginTop:1}}>
                                Care
                            </Typography>
                        </Stack>
                        </Link>
                    </Stack>
                </Stack>
{/* Responsive end */}
                <Stack justifyContent='space-around' spacing={{xs:2, sm:0}} alignItems='center' alignSelf='center' direction='row' sx={{display:{sm:'flex', xs:'none'}, width:'80%'}}>
                <Link component={RouterLink} to={`/store/cat/Plant`} underline='none'>
                    <Stack direction='column' alignItems='center'>
                        <Avatar alt='plants' src={plantImg} sx={{ width: 120, height: 120, '&:hover':{transform:'scale(1.1)'}, transition:'0.3s' }}/>
                        <Typography color='#fff' variant='h5' sx={{fontSize:{md:22, sm:20}, marginTop:1}}>
                            Plants
                        </Typography>
                    </Stack>
                </Link>
                <Link component={RouterLink} to={`/store/cat/Seeds`} underline='none'>
                    <Stack direction='column' alignItems='center'>
                        <Avatar alt='seeds' src={seedImg} sx={{ width: 120, height: 120, '&:hover':{transform:'scale(1.1)'}, transition:'0.3s' }}/>
                        <Typography color='#fff' variant='h5' sx={{fontSize:{md:22, sm:20}, marginTop:1}}>
                            Seeds
                        </Typography>
                    </Stack>
                </Link>
                <Link component={RouterLink} to={`/store/cat/Planters`} underline='none'>
                    <Stack direction='column' alignItems='center'>
                        <Avatar src={planterImg} sx={{ width: 120, height: 120, '&:hover':{transform:'scale(1.1)'}, transition:'0.3s' }} alt='planters'/>
                        <Typography color='#fff' variant='h5' sx={{fontSize:{md:22, sm:20}, marginTop:1}}>
                            Planters
                        </Typography>
                    </Stack>
                </Link>
                <Link component={RouterLink} to={`/store/cat/Care`} underline='none'>
                    <Stack direction='column' alignItems='center'>
                        <Avatar src={careImg} sx={{ width: 120, height: 120, '&:hover':{transform:'scale(1.1)'}, transition:'0.3s'}} alt='care' />
                        <Typography color='#fff' variant='h5' sx={{fontSize:{md:22, sm:20}, marginTop:1}}>
                            Care
                        </Typography>
                    </Stack>
                </Link>
                </Stack>
            </Stack> 
    )
}

export default CatHero
import React, {useEffect} from 'react'
import {Avatar, Link, Stack, Typography} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Stack spacing={2} sx={{justifyContent:'flex-start', alignItems:'center', marginTop:3}}>
            <Helmet>
                <title>Contact Us</title>
                <meta name='description' content='Get in touch with Balaji Nursery and Farms'/>
            </Helmet>
            <Avatar sx={{bgcolor: 'primary.main'}}>
                <LocalPhoneIcon color='#fff' />
            </Avatar>
            <Typography variant='h1' sx={{fontSize:30, fontWeight:'medium', paddingBottom:4}}>
                Contact Us
            </Typography>
            <Stack direction={{xs:'column', sm:'row'}} spacing={4} sx={{justifyContent:'space-around', width:'80%'}}>
                <Stack justifyContent='center'>
                    <Typography variant='body1' textAlign='center' sx={{fontSize:20}}>
                        Vinodray Makadia
                    </Typography>
                    <Typography variant='body1' textAlign='center' sx={{fontSize:16}}>
                        Owner
                    </Typography>
                    <Link underline='none' href="tel:8888888888">
                        <Typography variant='body1' textAlign='center' sx={{fontSize:18}}>
                            +91 8888888888
                        </Typography>
                    </Link>
                </Stack>
                <Stack justifyContent='center'>
                    <Typography variant='body1' textAlign='center' sx={{fontSize:20}}>
                        Prince Makadia
                    </Typography>
                    <Typography variant='body1' textAlign='center' sx={{fontSize:16}}>
                        Owner
                    </Typography>
                    <Link underline='none' href="tel:8888888888">
                        <Typography variant='body1' textAlign='center' sx={{fontSize:18}}>
                            +91 8888888888
                        </Typography>
                    </Link>
                </Stack>
            </Stack>
            <Link underline='none' href="mailto:balajinursery02@gmail.com">
                <Typography variant='h1' sx={{fontSize:20, paddingTop:4}}>
                    balajinursery02@gmail.com
                </Typography>
            </Link>
        </Stack>
    )
}

export default Contact
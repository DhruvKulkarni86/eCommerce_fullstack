import React, {useEffect} from 'react'
import { Stack, Typography, Box } from '@mui/material'
import '../components/Footer/razor.css';
import { Helmet } from 'react-helmet-async';

const LocateUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Stack spacing={2} sx={{justifyContent:'flex-start', alignItems:'center', marginTop:3}}>
            <Helmet>
                <title>Locate Us</title>
                <meta name='description' content='Locate Us @ Balaji Nursery and Farms'/>
            </Helmet>
            <Box sx={{display:{xs:'block', sm:'none'}, paddingBottom:4}}>
            <iframe title='map' className='map' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14671.79051318572!2d72.64330847138172!3d23.17211147027919!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb9a6cae7ca9e32b3!2sBALAJI%20NURSERY%20%26%20FARM!5e0!3m2!1sen!2sin!4v1648226330300!5m2!1sen!2sin" width="400" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Box>
            <Box sx={{display:{xs:'none', sm:'block'}, paddingBottom:4}}>
            <iframe title='map' className='map' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58687.76725975153!2d72.637515!3d23.170731!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb9a6cae7ca9e32b3!2sBALAJI%20NURSERY%20%26%20FARM!5e0!3m2!1sen!2sin!4v1651303845117!5m2!1sen!2sin" width="600" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Box>
            <Stack>
                <Typography variant='h1' textAlign='center' sx={{fontSize:{xs:25, sm:30}, fontWeight:'medium'}}>
                    Balaji Nursery and Farms
                </Typography>
                <Typography variant='h6' textAlign='center' sx={{fontSize:{xs:16, sm:20}, fontWeight:'medium'}}>
                    Gandhinagar-koba highway, Gandhinagar, Gujarat - 382421
                </Typography>
            </Stack>
            
        </Stack>
    )
}

export default LocateUs
import { Box, Stack, Typography, Link } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import './razor.css';

const Footer = () => {
    return (
        <Box sx={{width:'100%', borderTop:3, borderBottom:4, borderColor:'primary.main', borderRadius:'2px', backgroundColor:'primary.main', color:'#fff'}}>
            <Stack direction={{xs:'column', md:'row'}} spacing={{xs:7}} sx={{justifyContent:'space-between', paddingY:3, paddingX:{md:20, xs:4}}}>
                <Stack direction='row' sx={{justifyContent:'space-between', width:{md:'380px', xs:'100%'}}}>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='h6'>
                            ABOUT US
                        </Typography>
                        <Link color="#fff" component={RouterLink} to={`/ourStory`} underline='hover'>   
                        <Typography variant='subtitle2'>
                            Our Story
                        </Typography>
                        </Link>
                        <Link color="#fff" component={RouterLink} to={`/contactus`} underline='hover'>   
                        <Typography variant='subtitle2'>
                            Contact Us
                        </Typography>
                        </Link>
                        <Link color="#fff" component={RouterLink} to={`/locate`} underline='hover'>   
                            <Typography variant='subtitle2'>
                                Locate Store
                            </Typography>
                        </Link>
                    </Stack>
                    <Stack direction='column' spacing={2} sx={{alignItems:'flex-end'}}>
                        <Typography variant='h6'>
                            HELP CENTER
                        </Typography>
                        <Link color="#fff" component={RouterLink} to={`/terms`} underline='hover'>   
                        <Typography variant='subtitle2'>
                            Terms and Conditions
                        </Typography>
                        </Link>
                        <Link color="#fff" component={RouterLink} to={`/privacy`} underline='hover'>   
                        <Typography variant='subtitle2'>
                            Privacy
                        </Typography>
                        </Link>
                    </Stack>
                </Stack>
                <Box sx={{display:{xs:'flex'}, flexDirection:{xs:'column'}, justifyContent:'center', alignItems:'center'}}>
                    <a href="https://razorpay.com/" target="_blank" rel="noopener noreferrer">
                        <img referrerPolicy="origin" src="https://badges.razorpay.com/badge-light.png" alt="Razorpay | Payment Gateway | Neobank" className='razor'/>
                    </a>
                    <Link component={RouterLink} to='/store' underline='hover' sx={{marginTop:2}}>
                        <Typography variant='h6' sx={{color:'#fff'}}>
                            Balaji Nursey & Farms
                        </Typography>
                    </Link>
                    <Typography variant='caption'>
                        Gandhinagar-koba highway
                    </Typography>
                    <Typography variant='caption'>
                        Gandhinagar - 382421
                    </Typography>
                    {/* <iframe title='map' className='map' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14671.79051318572!2d72.64330847138172!3d23.17211147027919!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb9a6cae7ca9e32b3!2sBALAJI%20NURSERY%20%26%20FARM!5e0!3m2!1sen!2sin!4v1648226330300!5m2!1sen!2sin" width="400" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer
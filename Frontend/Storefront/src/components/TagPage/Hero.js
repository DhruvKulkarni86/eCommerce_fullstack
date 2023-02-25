import React from 'react'
import { Stack, Card, CardMedia, Box, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
const img = 'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
const Hero = ({tag}) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Stack direction='column' id='back-to-top-anchor' sx={{paddingY:2}}>
            <Card elevation={0} sx={{width:'90%', alignSelf:'center'}}>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia 
                        component='img' 
                        image={img} title={'catalogue'} 
                        sx={{
                            height:{md:160, xs:150}
                        }}
                    />
                    <Box
                        sx={{
                        position: 'absolute',
                        bottom: {md:'5%', xs:1},
                        left: {xs:2, md:20},
                        width: {md:'40%', xs:'100%'},
                        color: 'primary.main',
                        padding: '10px',
                        }}
                    >
                        <Typography color='primary' sx={{typography:{xs:'h6', sm:'h5'},fontWeight:{sm:'medium'}}}>
                            Category:
                        </Typography>
                        <Typography color='primary' variant='h6' sx={{fontWeight:{sm:'medium'}}}>
                            {capitalizeFirstLetter(tag)}
                        </Typography>
                        <Link component={RouterLink} underline='always' to='/store/catalogue'>
                            <Typography color='primary' sx={{typography:{sm:'subtitle2', xs:'subtitle2'},width:{xs:'50%', md:'100%'}, paddingTop:{md:3, sm:4, xs:3}}}>
                                Browse the entire catalogue
                            </Typography>
                        </Link>
                    </Box>
                </Box>
        </Card>
        </Stack>
    )
}

export default Hero
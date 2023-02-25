import React from 'react'
import { Box, Card, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {skip} from '../../features/skip'
import { checked } from '../../features/filter'

const BannerCard = ({img, title, caption}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        <Card onClick={handleCatalogue} elevation={0} sx={{width:'90%', alignSelf:'center', cursor:'pointer'}}>
            {/* <Link component={RouterLink} to='/store/catalogue'> */}
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
                        bottom: {md:'35%', xs:'35%'},
                        left: {xs:0, md:20},
                        width: {md:'40%', xs:'100%'},
                        color: 'primary.main',
                        padding: '10px',
                        }}
                    >
                        <Typography color='primary' variant='h5' sx={{fontWeight:{sm:'medium'}}}>
                            {title}
                        </Typography>
                        <Typography color='primary' variant='subtitle2' sx={{width:{xs:'70%', md:'100%'}}}>
                            {caption}
                        </Typography>
                    </Box>
                </Box>
            {/* </Link> */}
        </Card>
    )
}

export default BannerCard
import React from 'react'
import { Stack, CardMedia, Typography } from '@mui/material'

const SvgMsg = ({msg, img}) => {
    return (
        <Stack direction='column' alignItems='center' spacing={0} sx={{paddingY:2}}>
            <CardMedia component='img' image={img} alt='cart empty' sx={{width:200, height:200, objectFit:'contain'}}/>
            <Typography variant='h6' component='h3' textAlign='center' sx={{color:'#134E5E'}}>
                {msg}
            </Typography>
        </Stack>
    )
}

export default SvgMsg
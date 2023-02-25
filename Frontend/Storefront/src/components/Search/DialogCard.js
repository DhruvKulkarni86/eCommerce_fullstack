import { Card, Stack, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import React from 'react'
// import Plant from '../../assets/ficus-panda-bonsai.webp'

const DialogCard = ({id, name, price, sub, img, handleClose}) => {
    const navigate = useNavigate();
    const prodNav = () => {
        handleClose()
        navigate(`/store/product/${id}`)
    }
    return (
            <Card variant='outlined' onClick={prodNav} sx={{width:{md:'100%', xs:'100%'}, borderRadius:2, cursor:'pointer'}}>
                {/* <Stack direction='row'> */}
                <Stack direction='row' justifyContent='space-between' spacing={2} sx={{paddingX:2, paddingY:1}} >
                    <Stack direction='column' spacing={1}>
                        <Stack direction='column' spacing={0}>
                            <Typography variant='h6' color='primary'>
                                {name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {sub}
                            </Typography>
                        </Stack>
                        <Typography variant='h6' color='primary'sx={{display:{xs:'flex', sm:'none'}}}>
                            ₹{price}
                        </Typography>
                    </Stack>
                    <Typography variant='h6' color='primary' sx={{display:{xs:'none', sm:'flex', alignSelf:'flex-end'}}}>
                        ₹{price}
                    </Typography>
                </Stack>
                {/* </Stack> */}
            </Card>
    )
}

export default DialogCard

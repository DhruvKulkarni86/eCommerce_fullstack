import { CardMedia, Stack, Typography, Box, Card, IconButton, Link } from '@mui/material'
import React from 'react'
import Quantity from './Quantity';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../features/cart';
import { Link as RouterLink } from 'react-router-dom';

const CartCard = ({name, img, price, qty, id, open}) => {
    const dispatch = useDispatch();
    const handleRemove = (id) => {
        dispatch(deleteFromCart(id))
        open('Item deleted')
    }

    return (
        <Card variant='outlined' sx={{width:{md:'80%', xs:'100%'}, borderRadius:2 }}>
            <Stack 
                direction='row' 
                justifyContent='space-between' 
                sx={{width:'100%', padding:2}}
            >
                <Stack direction='row' spacing={2} >
                    <Box sx={{backgroundColor:'pageBack.main'}}>
                    <Link component={RouterLink} underline='none' to={`/store/product/${id}`}>
                        <CardMedia 
                        component='img' 
                        image={img}
                        // image={plant}
                        title={name} 
                        alt={name} 
                        sx={{height:{md:100, xs:100}, width:'100%', objectFit:'contain'}}/>
                    </Link>
                    </Box>
                    <Stack direction='column' spacing={2}>
                        <Stack direction='column' spacing={0}>
                        <Link component={RouterLink} underline='none' to={`/store/product/${id}`}>
                            <Typography variant='h5'color='primary'>
                                {name}
                            </Typography>
                        </Link>
                            <Typography variant='h6' color='text.secondary'>
                                ₹{price}
                            </Typography>
                        </Stack>
                        <Quantity qty={qty} id={id} />
                    </Stack>
                </Stack>
                <Stack alignSelf='flex-start'>
                    <IconButton onClick={()=>{handleRemove(id)}} color='primary' aria-label='delete'>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Card>
    )
}

export default CartCard
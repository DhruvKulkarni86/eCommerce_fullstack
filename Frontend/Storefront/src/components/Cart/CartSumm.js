import { Typography, Stack, Box, Button } from '@mui/material'
import { Delete } from '@mui/icons-material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart';
import { useNavigate } from 'react-router-dom';
import CartTable from './CartTable';

const CartSumm = ({data, open}) => {
    // console.log("CART DATA", data);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClear = () => {
        dispatch(clearCart());
        open('Cart Cleared')
    };

    const handleNavigate = () => {
        navigate("/store/order") //clear  state replace true
    };
    
    let totalPrice;
    if(data!==undefined){
        totalPrice = data.reduce((total, item)=>total+(item.productPrice*item.productQty),0);
    }
    // console.log("TOTAL PRICE", totalPrice);
    return (
        <Box sx={{width:'100%', padding:2}}>
            <Stack direction='column' spacing={2}>
                <Typography variant='h5' color='primary'>
                    Cart Summary
                </Typography>
                <CartTable data={data} totalPrice={totalPrice} variant='cart'/>
                <Stack direction='row' justifyContent='space-between'>
                    <Button 
                        onClick = {handleClear}
                        variant='outlined' 
                        size='small' 
                        startIcon={<Delete/>}
                        sx={{width:'45%'}}
                        >
                            clear cart
                    </Button>
                    <Button 
                        onClick = {handleNavigate}
                        variant='contained' 
                        size='small' 
                        sx={{width:'45%'}}
                        >
                            Place Order
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default CartSumm
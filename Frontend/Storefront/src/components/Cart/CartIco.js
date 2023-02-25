import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

const CartIco = () => {
    const cartQty = useSelector((state)=>state.cart.value.totalItems);
    // const cartQty = localStorage.getItem('totalItems');
    return (
        <Link to='/store/cart' component={RouterLink} underline='none'>
            <Badge badgeContent={cartQty} color="error">
                <IconButton sx={{ml:'5px', padding:'0px'}}>
                    <ShoppingCartIcon color="primary" fontSize="medium"/>
                </IconButton>
            </Badge>
        </Link>
    );
}

export default CartIco;

import { Alert, Grid, Stack, Snackbar, Link, Slide, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartCard from './CartCard';
import CartSumm from './CartSumm';
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { prog } from '../../features/cartProg';
import svg1 from '../../assets/plant2.webp';
import SvgMsg from '../SvgMsg';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state)=>state.cart.value.cartItems)
    // console.log("ITEMS", items);

    const user = useSelector((state)=>state.user.value.currentUser);
    // const cartVal = useSelector((state)=>state.cart.value.cartItems);

    useEffect(()=>{
        dispatch(prog({
            cartProg:0
        }))
        if(user===true){
            axios({
                url:`${process.env.REACT_APP_BACK_URL}/cart`,
                headers:{
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${localStorage.getItem('userToken')}`,
                    "Content-Type": "application/json"
                },
                data:{
                    cart:items
                },
                method:"PUT"
            }).then((res)=>{
                // console.log("CART RES RESP", res);
            })
        }
    },[items, user, dispatch])

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    const setOp = (text) => {
        setOpen(true);
        setText(text)
    }

    return (
        <>
        <Helmet>
                <title>Your Cart</title>
                <meta name='description' content='Check out your cart at Balaji Nursery & Farms'/>
        </Helmet>
        <Snackbar open={open} TransitionComponent={TransitionLeft} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity='success' sx={{width:'100%', border:'2px solid', borderColor:'primary.main'}}>
                {text}    
            </Alert>
        </Snackbar> 
        {items.length===0 && 
            <Stack direction='column' alignItems='center' justifyContent='center' spacing={3} sx={{width:'100%', marginY:{xs:5, md:5}}}>
                <SvgMsg img={svg1} msg={'Your cart is empty'}/>
                <Link component={RouterLink} underline='always' to={`/store/catalogue`}>
                    <Typography variant='h6' component='h3' textAlign='center' color='primary'>
                        Continue Shopping
                    </Typography>
                </Link>
            </Stack>
        }
        {items.length!==0 && 
        <>
            <Grid container justifyContent='space-between' rowSpacing={2} marginTop={1} sx={{paddingX:{md:15, xs:2}}}>
                <Grid item xs={12} md={6} sx={{display:{md:'none', xs:'block'}}}>
                    <CartSumm data={items} open={setOp}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction='column' spacing={1.5} sx={{paddingY:2}}>
                        {
                            items.map(item=>
                                <CartCard key={item.productId} id={item.productId} name={item.productName} price={item.productPrice} img={item.productImg} qty={item.productQty} open={setOp} />
                            )
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12} alignItems='flex-end' md={4} sx={{display:{md:'block', xs:'none'}}}>
                    <CartSumm data={items} open={setOp}/>
                </Grid>
            </Grid>
        </>
        }
        </>
    )
}

export default Cart
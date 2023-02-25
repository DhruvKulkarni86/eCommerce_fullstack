import React, {useEffect} from 'react'
import SvgMsg from '../components/SvgMsg'
import svg1 from '../assets/plant1.webp';
import { Stack, Typography, Link, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import { clearCart } from '../features/cart';
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios'

const PaymentConf = () => {
    const location = useLocation();
    // console.log("LOLOLOLO", location.state);
    const items = useSelector((state)=>state.cart.value.cartItems)
    // console.log("CART ITEMS", items);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(location.state===null){
            navigate('/store', {replace:true}) //something went wrong
        }
        dispatch(clearCart());
    },[location, navigate, dispatch])

    const handleHome = () => {
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
            navigate('/store', {replace:true}) //something went wrong
        })
    }
    
    return (
        <Stack direction='column' spacing={1} sx={{justifyContent:'center', alignItems:'center', width:'100%', marginTop:5}}>
            <SvgMsg img={svg1} msg='Payment Successful!' />
            <Typography variant='h3' textAlign='center' sx={{fontSize:20}}>
                Your order
                <Typography sx={{color:'#134E5E', display:'inline', marginX:1, fontWeight:'medium'}}>
                    {location.state.id} 
                </Typography>
                has been placed successfully.
            </Typography>
            <Typography variant='h3' textAlign='center' sx={{fontSize:20}}>
                A digital invoice has been sent to
                <Typography sx={{color:'#134E5E', display:'inline', marginX:1, fontWeight:'medium'}}>
                    {location.state.mail}.
                </Typography>
            </Typography>
            <Typography variant='h3' textAlign='center' sx={{fontSize:20}}>
                You can track your orders from 
                <Link component={RouterLink} underline='always' to={`/orders`}>
                    <Typography sx={{color:'#134E5E', display:'inline', marginX:1, fontWeight:'medium'}}>
                        here
                    </Typography>
                </Link>
            </Typography>
            <Button onClick={handleHome} variant='contained' sx={{marginTop:2, backgroundColor:'#134E5E'}}>
                Continue shopping
            </Button>
        </Stack>
    )
}

export default PaymentConf
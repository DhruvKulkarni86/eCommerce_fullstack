import { Button, Stack, Typography, Box } from '@mui/material'
import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { prog } from '../../features/cartProg';
import StoreTheme from '../../themes/StoreTheme';
import { ThemeProvider } from '@mui/system';
import CartTable from '../Cart/CartTable';

//! TO DO - After Payment -> clear cart/global state/redirect to homepage
//!Payment failed -> logout

const PaymentSumm = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uname = useSelector((state)=>state.user.value.userName);
    const uMail = useSelector((state)=>state.user.value.userEmail);
    const items = useSelector((state)=>state.cart.value.cartItems);
    
    useEffect(() => {
        dispatch(prog({
            cartProg:2
        }))
        if(location.state===null){
            navigate('/store', {replace:true}) //something went wrong
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, [dispatch, navigate, location]);

    const payNow = (location) => {
        const options = {
            key: process.env.RAZORPAY_KEY,
            amount: location.state.payData.amount.toString(),
            currency: location.state.payData.currency,
            name: "Shree Balaji Nursery",
            description: location.state.payData.notes.desc,
            image: "https://cdn.cp.adobe.io/content/2/dcx/091b814b-bf46-41a8-bca5-5bb6c03ff693/rendition/preview.jpg/version/1/format/jpg/dimension/width/size/256",
            order_id:location.state.payData.id,
            handler: async function (response) {
                // alert("Payment Success");
                const data = {
                orderCreationID: location.state.payData.id,
                razorpayPaymentID: response.razorpay_payment_id,
                razorpayOrderID: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                };
                console.log("AFTER PAYMENT", data);
                const result = await axios.post(`${process.env.REACT_APP_BACK_URL}/transaction/success`, data)
                const confData = {
                    id:location.state.payData.id,
                    mail:uMail,
                }
                navigate('/paymentDone', {state:confData}) //!navigate to payment conf page
                console.log(result.data);
            },
            prefill: {
                name: uname,
                email: uMail,
                contact:location.state.addr.PNo
            },
            modal:{
                animation: true,
                confirm_close: true,
                handleback:true,
            },
            theme: {
                color: "#134E5E",
                // hide_topbar: false,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            const data = {
                'orderId':response.error.metadata.order_id,
            }
            axios.post(`${process.env.REACT_APP_BACK_URL}/transaction/failure`, data).then((res)=>{
                console.log("FAILRESP", res);
            })
            console.log(response.error.code, response.error.description,response.error.source,response.error.step,response.error.reason,response.error.metadata.order_id,response.error.metadata.payment_id);
            navigate('/paymentErr', {replace:true}) //!navigate to payment error page
        })
    }
    return (
        <ThemeProvider theme={StoreTheme}>
            <>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <Stack spacing={5} direction='column' justifyContent='center' sx={{paddingX:{xs:2, md:10}, paddingY:5, width:'100%'}}>
                <Typography variant='h1' sx={{fontSize:30, fontWeight:'medium'}}>
                    Payment Summary
                </Typography>
                <Stack spacing={5} direction={{xs:'column', md:'row'}} justifyContent='space-between'>
                <Stack spacing={2} direction='column'>
                    <Stack>
                        <Typography variant='body1' sx={{fontSize:18}}>
                            {location.state.addr.Name}
                        </Typography>
                        <Typography variant='body1' sx={{fontSize:18}}>
                            {location.state.addr.PNo}
                        </Typography>
                        <Typography variant='body1' sx={{fontSize:18}}>
                            {location.state.addr.HouseNo}, {location.state.addr.Street}, {location.state.addr.Area}, {location.state.addr.City} - {location.state.addr.Pincode}
                        </Typography>
                    </Stack>
                    <Box sx={{width:{xs:'100%', sm:'50%', md:'100%'}}}>
                        <CartTable variant='cart' data={items} totalPrice={location.state.payData.amount/100}/>
                    </Box>
                </Stack>
                <Button onClick={()=>{payNow(location)}} variant='contained' sx={{width:200, height:50}}>
                    PAY NOW
                </Button>
                </Stack>
                
                
            </Stack>
            </>
        </ThemeProvider>
    )
}

export default PaymentSumm
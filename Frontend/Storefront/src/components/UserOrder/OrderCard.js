import { Card, CardContent, Stack, Typography, Chip, Button, Dialog, DialogContent, DialogTitle, Box, TextField } from '@mui/material';
import React, {useState} from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CartTable from '../Cart/CartTable';
import RatingComp from './RatingComp';
import axios from 'axios';

const OrderCard = ({data}) => {
    const [open, setOpen] = useState(false)
    const [fopen, setFOpen] = useState(false)
    const [feed, setFeed] = useState('');
    const handleFeed = e => setFeed(e.target.value);
    const handleClickOpen = () => {
        setOpen(true);
        // setSkip(false);
    };
    const handleClose = () => {
        // clearInput();
        setOpen(false);
        // setSkip(true);
    };
    const handleFeedOpen = () => {
        setFOpen(true);
    }
    const handleFeedClose = () => {
        setFOpen(false);
    }
    const handleSubmit = () => {
        let token = localStorage.getItem('userToken');
        axios({
            url:`${process.env.REACT_APP_BACK_URL}/customer/feedback`,
            headers:{
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data:{
                'feedback':feed,
                'orderId': data._id
            },
            method:"POST"
        }).then((res)=>{
            alert('Feedback Submitted')
            handleClose()
        }).catch((err)=>{
            alert(err)
        })
    }
    return (
        <>
        <Card variant='outlined' sx={{width:{xs:'90%', md:'50%'}, marginBottom:2, alignSelf:{xs:'center', md:'flex-start'}}}>
                <CardContent>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack direction='column' spacing={0}>
                            <Typography variant='h6' component='h2' color='primary' sx={{fontSize:{md:20, xs:14}}}>
                                {data._id}
                            </Typography>
                            <Typography variant='body1' sx={{fontSize:14, fontWeight:'regular'}}>
                                {data.CreatedOn.split(':').shift()}
                            </Typography>
                        </Stack>
                        <Stack alignItems='flex-end'>
                            <Button onClick={handleClickOpen} size='small' variant='outlined' sx={{fontSize:{xs:10, sm:14}}}>
                                View Details
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' sx={{marginTop:2}}>
                        <>
                        {data.Status==='Failed'?
                            <Chip variant='outlined' color='error' icon={<CancelOutlinedIcon/>} label="Payment Failed" sx={{marginTop:1}}/>
                        :
                            <Chip variant='contained' color='success' icon={<LocalShippingOutlinedIcon/>} label={data.deliveryStatus} sx={{marginTop:1}}/>
                        }
                        {(data.feedback===false && data.deliveryStatus==='Delivered') &&
                            <Button onClick={handleFeedOpen} variant='contained' size='small' sx={{fontSize:14}}>
                                Give Feedback
                            </Button>
                        }
                        </>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack spacing={0} sx={{marginTop:3}}>
                            <Typography variant='body2' sx={{fontSize:16}}>
                                {data.Name}
                            </Typography>
                            <Stack direction='row' spacing={0.2}>
                                <PhoneIcon sx={{alignSelf:'center', fontSize:14}}/>
                                <Typography variant='body2' sx={{fontSize:16}}>
                                    {data.PhoneNumber}
                                </Typography>
                            </Stack>
                        </Stack>
                    <Stack spacing={0} sx={{marginTop:3, alignItems:'flex-end'}}>
                        <Typography variant='body2' sx={{fontSize:16}}>
                            {data.paymentMethod}
                        </Typography>
                        <Typography variant='body2' sx={{fontSize:16}}>
                            ₹ {data.Amount/100}
                        </Typography>
                    </Stack>
                    </Stack>
            </CardContent>
        </Card>
        <Dialog open={open} fullWidth maxWidth='sm' onClose={handleClose}>
            <DialogTitle sx={{color:'primary.main'}}>
                Order Details
            </DialogTitle>
            <DialogContent>
                <Stack direction='column' spacing={1} sx={{paddingBottom:1}}>
                    <Typography variant='h6' component='h2' color='primary' sx={{fontSize:{md:18, xs:14}}}>
                        Address:
                    </Typography>
                    <Typography variant='h6' component='h2' color='primary' sx={{fontSize:{md:16, xs:12}}}>
                        {data.Address.HouseNo}, {data.Address.Street}, {data.Address.Area}, {data.Address.City} - {data.Address.Pincode}
                    </Typography>
                </Stack>
                <CartTable variant='order' data={data.OrderDetails} totalPrice={data.Amount/100}/>
            </DialogContent>
        </Dialog>
        <Dialog open={fopen} fullWidth maxWidth='sm' onClose={handleFeedClose}>
            <DialogTitle sx={{color:'primary.main'}}>
                Feedback
            </DialogTitle>
            <DialogContent>
                <Stack direction='column' justifyContent='center' spacing={1} sx={{paddingBottom:1, width:'100%'}}>
                    <Typography variant='h6' component='h2' color='primary' sx={{fontSize:{md:16, xs:12}}}>
                        Rate your order:
                    </Typography>
                    {data.OrderDetails.map(item=>(
                        <Stack direction='row' key={item.productId} spacing={1}>
                            <RatingComp item={item} />
                        </Stack>
                    ))}
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{width:'100%', height:'auto', marginTop:1, alignSelf:'center'}}>
                        <TextField 
                            autoComplete='feedback'  
                            multiline 
                            rows={4}
                            value={feed} 
                            onChange={handleFeed} 
                            id='feedback' 
                            label='Share your feedback'
                            sx={{width:'100%'}}
                        />
                        <Button variant='contained' type='submit' sx={{marginY:2}}>
                            Submit
                        </Button>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default OrderCard
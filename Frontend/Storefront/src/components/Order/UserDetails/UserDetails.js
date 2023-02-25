import { Box, Typography, Stack, Grid, TextField, Button, Radio } from '@mui/material'
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Helmet } from 'react-helmet-async';
import { prog } from '../../../features/cartProg';
import { auth } from '../../../firebase/config';
import SvgMsg from '../../SvgMsg';
import svgImg from '../../../assets/plant4.webp';
import { useGetAddrQuery } from '../../../services/Prod';

const validationSchema = yup.object({
    fullName: yup
        .string('Full Name')
        .max(30, 'Please enter a valid name')
        .required('Please enter your name'),
    phoneNumber: yup
        .string('Phone Number')
        .matches(/^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/, 'Please enter a valid number')
        .required('Phone number required'),
    pin: yup
        .string('Pincode')
        .matches(/^[3][8][0-9]{4}$/, 'Invalid Pin')
        .required('Pin Required'),
    houseNumber:yup
        .string('House Number')
        // .max(15, 'Enter a valid response')
        .required('House number required'),
    street:yup
        .string('Street')
        .required('Enter a valid response'),
    area:yup
        .string('Area')
        .required('Enter a valid response'),
    city:yup
        .string('City')
        .required('Enter a valid response'),
});

const UserDetails = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const items = useSelector((state)=>state.cart.value.cartItems)
    const uname = useSelector((state)=>state.user.value.userName)
    useEffect(()=>{
        dispatch(prog({
            cartProg:1
        }))
        if(items.length===0){
            navigate('/store')
        }
    },[dispatch, navigate, items])

    let token = localStorage.getItem("userToken");
    const {data, error, isSuccess, isError, refetch} = useGetAddrQuery(`${token}`);
    if(isError===true){
        if(error.originalStatus===401){
            auth.currentUser.getIdToken().then((token)=>{
                localStorage.setItem("userToken", token)
                refetch();
            })
        }
    }

    // const [loading, setLoading] = useState(false);
    let uniqueAddr=[];
    if(isSuccess===true && data.length>=1){
        uniqueAddr = [
            ...new Map(data.map((item) => [item["Name"], item])).values(),
        ];
    }
    
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };



    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            fullName:uname,
            phoneNumber:'',
            pin:'',
            houseNumber:'',
            street:'',
            area:'',
            city:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log("VALUES", values);
            // alert(JSON.stringify(values, null, 2));
            axios({
                url:`${process.env.REACT_APP_BACK_URL}/transaction/create-order`,
                headers:{
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data:{
                    "Cart":items,
                    "Name":values.fullName,
                    "PhoneNumber":values.phoneNumber,
                    "Address":{
                        'HouseNo':values.houseNumber,
                        'Street':values.street,
                        'Area':values.area,
                        'City':values.city,
                        'Pincode':values.pin
                    } 
                },
                method:"POST"
            }).then((res)=>{
                if(res.data.message==='token expired'){
                    auth.currentUser.getIdToken().then((token)=>{
                        localStorage.setItem("userToken", token)
                        //show some alert
                    })
                }
                else{
                const payData =  {
                    addr : {
                        'HouseNo' : values.houseNumber,
                        'Street' : values.stret,
                        'Area' : values.area,
                        'City' : values.city,
                        'Pincode' : values.pin,
                        'Name' : values.fullName,
                        'PNo' : values.phoneNumber
                    },
                    payData : res.data
                }   
                navigate('/store/payment', {state:payData})
                }
            })
        },
    });

    const handleAddr = (id) => {
        const selectedAddr = uniqueAddr.filter((addr)=>addr._id===id)
        axios({
            url:`${process.env.REACT_APP_BACK_URL}/transaction/create-order`,
            headers:{
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data:{
                "Cart":items,
                "Name":selectedAddr[0].Name,
                "PhoneNumber":selectedAddr[0].PhoneNumber,
                "Address":{
                    'HouseNo':selectedAddr[0].Address.HouseNo,
                    'Street':selectedAddr[0].Address.Street,
                    'Area':selectedAddr[0].Address.Area,
                    'City':selectedAddr[0].Address.City,
                    'Pincode':selectedAddr[0].Address.Pincode
                } 
            },
            method:"POST"
        }).then((res)=>{
            if(res.data.message==='token expired'){
                auth.currentUser.getIdToken().then((token)=>{
                    localStorage.setItem("userToken", token)
                    // console.log("NEW TOKK", token);
                })
            }
            else{
            const payData =  {
                addr : {
                    'HouseNo' : selectedAddr[0].Address.HouseNo,
                    'Street' : selectedAddr[0].Address.Street,
                    'Area' : selectedAddr[0].Address.Area,
                    'City' : selectedAddr[0].Address.City,
                    'Pincode' : selectedAddr[0].Address.Pincode,
                    'Name' : selectedAddr[0].Name,
                    'PNo' : selectedAddr[0].PhoneNumber
                },
                payData : res.data
            }   
            navigate('/store/payment', {state:payData})
            }
        })
    }

    return (
        <Stack direction={{xs:'column', sm:'row'}} justifyContent='space-around' sx={{width:{xs:'100%', sm:'100%'}, paddingX:{xs:0, sm:5}, marginTop:3}}>
            <Stack direction='column' spacing={2} sx={{marginTop:{xs:3, sm:5}, paddingX:{xs:2, sm:5}, alignSelf:{xs:'center', sm:'flex-start'}, alignItems:{xs:'center', sm:'flex-start'}, width:{xs:'90%', sm:'40%'}}}>
                <Helmet>
                    <title>Checkout Details</title>
                </Helmet>
                <Stack direction='row'>
                    <Radio
                        checked={selectedValue === 'typeform'}
                        onChange={handleChange}
                        value={'typeform'}
                        name="radio-buttons"
                        sx={{alignSelf:'center'}}
                        // inputProps={{ 'aria-label': {} }}
                    />
                    <Typography variant='h5' component='h1' sx={{alignSelf:'center'}}>
                        Add delivery address:
                    </Typography>
                </Stack>
                <Box 
                    component='form'
                    noValidate
                    onSubmit={formik.handleSubmit}
                    sx={{width:{md:'100%', xs:'100%'}}}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        {uname===null?
                            "loading..."
                            :
                            <TextField
                            fullWidth
                            value={formik.values.fullName === null ? '' : formik.values.fullName}
                            onChange={formik.handleChange}
                            type='text'
                            name='fullName'
                            label='Full Name'
                            autoComplete='fullName'
                            size='small'
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                        }
                        </Grid> 
                        <Grid item xs={6}>
                            <TextField
                            fullWidth
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            type='text'
                            name='phoneNumber'
                            label='Phone Number'
                            autoComplete='phoneNumber'
                            size='small'
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            />    
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            fullWidth
                            value={formik.values.pin}
                            onChange={formik.handleChange}
                            type='text'
                            name='pin'
                            label='Pincode'
                            autoComplete='pin'
                            size='small'
                            error={formik.touched.pin && Boolean(formik.errors.pin)}
                            helperText={formik.touched.pin && formik.errors.pin}
                            />    
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            value={formik.values.houseNumber}
                            onChange={formik.handleChange}
                            type='text'
                            name='houseNumber'
                            label='House Number'
                            autoComplete='houseNumber'
                            size='small'
                            error={formik.touched.houseNumber && Boolean(formik.errors.houseNumber)}
                            helperText={formik.touched.houseNumber && formik.errors.houseNumber}
                            />    
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            type='text'
                            name='street'
                            label='Street'
                            autoComplete='street'
                            size='small'
                            error={formik.touched.street && Boolean(formik.errors.street)}
                            helperText={formik.touched.street && formik.errors.street}
                            />    
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            value={formik.values.area}
                            onChange={formik.handleChange}
                            type='text'
                            name='area'
                            label='Area'
                            autoComplete='area'
                            size='small'
                            error={formik.touched.area && Boolean(formik.errors.area)}
                            helperText={formik.touched.area && formik.errors.area}
                            />    
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            type='text'
                            name='city'
                            label='City'
                            autoComplete='city'
                            size='small'
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                            />    
                        </Grid>  
                        <Grid item xs={12}>
                            <Button type='submit' disabled={selectedValue !==('typeform')} variant='contained'>
                                Submit
                            </Button>
                        </Grid> 
                    </Grid>
                </Box>
            </Stack>
            <Stack justifyContent='center' sx={{marginTop:{xs:5, sm:0}, paddingBottom:4}}>
                <Typography textAlign='center' variant='h5' sx={{ width:'100%', alignSelf:{xs:'center', sm:'flex-start'}, marginTop:{xs:2, sm:5}}}>
                    Or select from previous addresses:
                </Typography>
                <Stack direction='column' spacing={1} sx={{width:'80%', alignSelf:'center',  marginTop:3}}>
                    {isSuccess && 
                        <>
                        {data.length!==0?
                            <>
                            {uniqueAddr.map(addr=>
                                <Stack key={addr._id} direction='row' spacing={2} sx={{padding:2}}>
                                    <Box>
                                    <Radio
                                        checked={selectedValue === addr._id}
                                        onChange={handleChange}
                                        value={addr._id}
                                        name="radio-buttons"
                                    />
                                    </Box>
                                    <Stack direction='column' spacing={0} sx={{fontSize:14}}>
                                        <Typography variant='body1'>
                                            {addr.Name}
                                        </Typography>
                                        <Typography variant='body1'>
                                            {addr.PhoneNumber}
                                        </Typography>
                                        <Typography variant='body1'>
                                            {addr.Address.HouseNo}, {addr.Address.Street}, {addr.Address.Area}, {addr.Address.City} - {addr.Address.Pincode}
                                        </Typography>
                                        <Button onClick={()=>handleAddr(addr._id)} variant='contained' disabled={selectedValue!==addr._id} size='small' sx={{width:'90px', marginTop:1}}>
                                        Submit
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}
                            </>
                            :
                            <>
                                <SvgMsg msg='One step closer from the garden of your dreams!' img={svgImg}/>
                                <Typography textAlign='center' variant='h6' sx={{fontSize:18, width:'80%', alignSelf:'center'}}>
                                    Currently delivering across Ahmedabad and Gandhinagar only
                                </Typography>
                            </>
                        }
                        </>
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}

export default UserDetails
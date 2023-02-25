import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../services/Prod';
import { Box, Button, CardMedia, Grid, Stack, Typography, Alert, Snackbar, Slide, Link, Rating } from '@mui/material';
import DetailCard from './DetailCard';
import { useSelector, useDispatch } from 'react-redux';
import {add} from '../../features/cart';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom'
import MainProdSkeleton from './MainProdSkeleton';
import RecomCard from '../RecomCard/RecomCard';
import { Helmet } from 'react-helmet-async';
import svg2 from '../../assets/plant3.webp';
import SvgMsg from '../SvgMsg';

const MainResult = () => {
    const dispatch = useDispatch();
    let urlParams = useParams();

    const [open, setOpen] = useState(false);

    const {data, error, isLoading, isSuccess} = useGetProductQuery(`${urlParams.id}`);
    // let isLoadingg = true;
    let finalRating;
    if(isSuccess===true && data!==null){
        finalRating = Math.floor(data.ratingTotal/data.noOfRaters);
    }


    const cartVal = useSelector((state)=>state.cart.value);
    const user = useSelector((state)=>state.user.value.currentUser);
    const pExists = useSelector((state)=>state.cart.value.cartItems.filter(el=>el.productId===urlParams.id));

    const handleAdd = () => {
        // setExists(true)
        let wl = {
            productId:data._id,
            productName:data.Name,
            productImg:data.BrowseImg,
            productPrice:data.Price,
            productQty:1,
        }
        dispatch(add(wl))
        setOpen(true);
    }

    useEffect(()=>{
        if(user===true){
            axios({
                url:`${process.env.REACT_APP_BACK_URL}/cart`,
                headers:{
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${localStorage.getItem('userToken')}`,
                    "Content-Type": "application/json"
                },
                data:{
                    cart:cartVal.cartItems
                },
                method:"PUT"
            }).then((res)=>{
                console.log("ITEM ADDED");
            })
        }
    },[cartVal, user])


    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    return (
        <>
            {isLoading && 
                <MainProdSkeleton/>
            }
            {error &&
                <Stack alignItems='center' sx={{justifyContent:'center', alignItems:'center', height:'80vh'}}>
                    <SvgMsg img={svg2} msg={'Failed to load, try again'}/>
                </Stack>
            }
            {(isSuccess && data===null) &&
                <Stack sx={{justifyContent:'center', alignItems:'center', height:'80vh'}}>
                    <SvgMsg img={svg2} msg={'Resource does not exist'}/>
                </Stack>
            }
            {(isSuccess && data!==null) &&
            <>
                <Helmet>
                    <title>{data.Name}</title>
                    <meta name='description' content={`Buy ${data.Name} on Balaji Nursery & Farms`}/>
                </Helmet>
                <Snackbar open={open} TransitionComponent={TransitionLeft} autoHideDuration={2000} onClose={handleClose}>
                    <Alert severity='success' sx={{width:'100%', border:'2px solid', borderColor:'primary.main'}}>
                        Added to Cart    
                    </Alert>
                </Snackbar> 
                <Grid container rowSpacing={2} columnSpacing={3} paddingX={4} sx={{marginY:{xs:1, md:2}}}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{backgroundColor:'cardBack.main', display:'flex', justifyContent:'center'}}>
                            <CardMedia component='img'
                            // image={mainPlantImg}
                            image={data.MainImg}
                            title={data.Name} alt={data.Name} sx={{height:{md:600, xs:300}, width:'100%', objectFit:'contain'}}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction='column' spacing={3} sx={{marginLeft:{xs:0, md:10}}}>
                            <Stack direction='column' sx={{alignItems:{xs:'center', md:'initial'}}}>
                                <Typography component='h1' color='text.primary' sx={{typography:{xs:'h5', md:'h3'}}}>
                                    {data.Name}
                                </Typography>
                                <Link underline='hover' component={RouterLink} to={`/store/${data.SubCategory}`}>
                                    <Typography variant='subtitle1' component='h6' color='primary'>
                                        {data.SubCategory}
                                    </Typography>
                                </Link>
                            </Stack>
                            {(!isNaN(finalRating) && finalRating!==0) &&
                            <Rating value={finalRating} readOnly/>}
                            <Typography variant='h4' component='h2' color='text.primary' sx={{typography:{xs:'h5', md:'h4'}, fontFamily:'Roboto'}}>
                                ₹{data.Price}
                            </Typography>
                            {data.Quantity >5 && 
                                <>
                                {pExists.length===0?
                                    <Button onClick={handleAdd} variant='contained' size='medium' color='primary' sx={{width:{md:'50%', sm:'40%'}}}>
                                        Add To Cart
                                    </Button>
                                    :
                                    <Link to='/store/cart' component={RouterLink} underline='none'>
                                        <Button variant='contained' size='medium' color='primary' sx={{width:{md:'50%', sm:'40%', xs:'100%'}}}>
                                            View Cart
                                        </Button>
                                    </Link>
                                }
                                </>
                            }
                            {data.Quantity <= 5 && 
                                <>
                                    <Typography variant='h3' sx={{fontSize:20, color:'#d63d34'}}>
                                        Out of Stock!
                                    </Typography>
                                </>
                            }
                            <DetailCard details={data.Details} cat={data.Category}/>
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction='column' spacing={2} sx={{paddingX:1, paddingY:1}}>
                    {/* if seeds then show manure/soil */}
                    <Stack direction='column'>
                        <Stack direction='column' sx={{paddingTop:1, paddingX:{sm:5, xs:3}, alignItems:'flex-start'}}>
                            <Typography variant='h6' color='primary'>
                                Frequently bought together
                            </Typography>
                        </Stack>
                        <RecomCard tags="Planter" skip={urlParams.id}/>
                    </Stack>
                    <Stack direction='column'>
                        <Stack direction='column' sx={{paddingTop:1, paddingX:{sm:5, xs:3}, alignItems:'flex-start'}}>
                            <Typography variant='h6' color='primary'>
                                Also check out
                            </Typography>
                        </Stack>
                        <RecomCard tags={data.SubCategory} skip={urlParams.id}/>
                    </Stack>
                </Stack>
            </>
            }
        </>
    )
}

export default MainResult
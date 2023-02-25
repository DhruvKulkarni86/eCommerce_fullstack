import React, { useEffect } from 'react'
import { useGetAllProductsQuery } from '../../services/Prod'
import ProductGrid from './ProductGrid';
import { Grid, Skeleton, Stack, Fab } from '@mui/material';
import ScrollToTop from '../ScrollToTop';
import { KeyboardArrowUp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {fetch} from '../../features/dataFetch';
// import { sorted } from '../../features/sort';
import { Helmet } from 'react-helmet-async';
import SvgMsg from '../SvgMsg';
import svg2 from '../../assets/plant3.webp';

const FetchProducts = ({page, load, setTotal}) => {
    const dispatch = useDispatch();
    const sortOp = useSelector((state) => state.sort.value.sort);
    // console.log("SORT", sortOp);
    // const flt = useSelector((state) => state.filter.value.filters);
    // console.log("FLT", flt);
    const skip = useSelector((state) => state.skip.value.skip);
    // console.log("SKIP", skip);
    const prodData = useSelector((state) => state.filter.value.fltProd);
    // console.log("MAIN PROD DATA", prodData);

    const {data, error, isLoading, isSuccess, status} = useGetAllProductsQuery({ name: `${page}`, sort:`${sortOp}` }, {skip,});

    // console.log("STATUSSSSS", status);

    // console.log("IS LOAD", isLoading);
    useEffect(()=>{
        if(isSuccess===true){
            setTotal(data.productCount)
            dispatch(fetch({
                fetched:true
            }))
        }
    },[isSuccess, dispatch, data, setTotal])
    
    return (
        <>
            <Helmet>
                <title>Catalogue</title>
                <meta name='description' content='Explore the Balaji Nursery catalogue'/>
            </Helmet>
            {(isLoading || status==='pending') &&
                <Grid container justify="center" paddingX={8} paddingY={3} spacing={3} sx={{mt:1}}>
                    {[...Array(12)].map((input, index)=>
                        <Grid item xs={12} sm={6} md={4} key={index} >
                            <Skeleton variant='rectangular' height={250} />
                            <Skeleton variant='text'/>
                        </Grid>
                    )}
                </Grid>
            }
            {error  && 
                <Stack alignItems='center'>
                    <SvgMsg img={svg2} msg={'Failed to load, please try again'}/>
                </Stack>
            }
            {isSuccess && status==='fulfilled' &&
                <>
                    {/* <ProductFilter/> */}
                    <ProductGrid data={data.data} page='main' />
                    <ScrollToTop>
                        <Fab color="primary" size="small" aria-label="scroll back to top" sx={{display:{md:'none', xs:'flex'}}}>
                            <KeyboardArrowUp />
                        </Fab>
                    </ScrollToTop>
                </>
            }
            {
                prodData && skip &&
                <>
                    <ProductGrid data={prodData} page='main' />
                    <ScrollToTop>
                        <Fab color="primary" size="small" aria-label="scroll back to top" sx={{display:{md:'none', xs:'flex'}}}>
                            <KeyboardArrowUp />
                        </Fab>
                    </ScrollToTop>
                </>
            }
            {/* {
                sortOp === 'LowToHigh' &&
                <>
                    <ProductGrid data={prodData}/>
                    <ScrollToTop>
                        <Fab color="primary" size="small" aria-label="scroll back to top" sx={{display:{md:'none', xs:'flex'}}}>
                            <KeyboardArrowUp />
                        </Fab>
                    </ScrollToTop>
                </>
            } */}
        </>
)}

export default FetchProducts
import React, {useState} from 'react'
import { Box, Grid, Pagination, Stack } from '@mui/material'
import ProductSort from './ProductSort';
import FilterLeft from './Filter/FilterLeft';
import FetchProducts from './FetchProducts';
import { useSelector } from 'react-redux';

// import ProductGrid from './ProductGrid';
const ProductCatalogue = () => {
    const [page, setPage] = useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    }
    const [total, setTotal] = useState(10);

    const flt = useSelector((state) => state.dataFetch.value.fetched);
    const skip = useSelector((state) => state.skip.value.skip);
    // console.log("PARENT SKIP", skip);

    return (
        <Box sx={{display:'flex', flexDirection:'column', width:'100%', paddingX:5, paddingY:3}}>
            <Stack id='back-to-top-anchor' direction='row' sx={{justifyContent:'flex-end',display:{xs:'none', md:'flex'}}}>
                <ProductSort/>
            </Stack>
            <Grid container justifyContent='space-between' sx={{marginY:5}}>
                <Grid item xs={12} md={3} sx={{display:{md:'grid', xs:'none'}}}>
                    <FilterLeft/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <FetchProducts setTotal={setTotal} page={page} />
                    {(flt===true && skip!==true) &&
                        <Stack alignItems='center' sx={{marginTop:3, width:'100%'}}>
                            <Pagination count={Math.ceil(total/12)} page={page} onChange={handlePage} color='primary' siblingCount={0} />
                        </Stack>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductCatalogue
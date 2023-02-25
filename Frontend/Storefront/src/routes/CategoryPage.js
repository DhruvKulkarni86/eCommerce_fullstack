import React, {useEffect, useState} from 'react'
import { useGetCategoryMainQuery } from '../services/Prod'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Stack, Grid, Skeleton, Fab, Typography, Pagination } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import SvgMsg from '../components/SvgMsg'
import svg1 from '../assets/plant3.webp';
import ProductGrid from '../components/Product/ProductGrid'
import ProductSort from '../components/Product/ProductSort'
import ScrollToTop from '../components/ScrollToTop'
import { useSelector } from 'react-redux';


const CategoryPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let urlParams = useParams();

    const sortOp = useSelector((state) => state.sort.value.sort);

    const [page, setPage] = useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    }
    const {data, error, isLoading, isSuccess} = useGetCategoryMainQuery({catName:`${urlParams.cat}`, sort:`${sortOp}`, number:`${page}`});

    return (
        <>
            <Helmet>
                <title>Store : {urlParams.cat}</title> 
                <meta name='description' content={`Explore products from ${urlParams.cat}`}/>
            </Helmet>
            {(isLoading) &&
            <>
                <Stack direction='column' sx={{paddingY:5}}>
                    <Skeleton variant='rectangular' height={150} sx={{alignSelf:'center', width:'90%'}}/>
                </Stack>
                <Grid container justify="center" paddingX={8} spacing={3} sx={{mt:1, paddingBottom:3}}>
                    {[...Array(6)].map((input, index)=>
                        <Grid item xs={12} sm={6} md={4} key={index} >
                            <Skeleton variant='rectangular' height={250} />
                            <Skeleton variant='text'/>
                        </Grid>
                    )}
                </Grid>
            </>
            }
            {error  && 
                <Stack alignItems='center' sx={{paddingY:5}}>
                    <SvgMsg img={svg1} msg={'Failed to load, please try again'}/>
                </Stack>
            }
            {isSuccess &&
                <>
                    {data.data.length!==0?
                    <>
                        <Stack>
                            <Stack direction='row' sx={{width:'90%', alignSelf:'center', justifyContent:{xs:'center', sm:'flex-start'}}}>
                                <Typography
                                id='back-to-top-anchor'
                                color="primary"
                                variant="h1"
                                noWrap
                                component="h1"
                                sx={{ marginTop:2, fontWeight:'bold', background: "-webkit-linear-gradient(45deg, #134E5E 24%, #71B280 64%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", alignSelf:{sm:'flex-start', xs:'center'}, fontSize:{xs:30, sm:40}}}
                                >
                                    Category : {urlParams.cat}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Stack direction='row' sx={{justifyContent:{sm:'flex-start', xs:'center'}, width:'90%', alignSelf:'center', display:{xs:'flex', sm:'flex'}, marginTop:3}}>
                                <ProductSort/>
                            </Stack>
                        </Stack>
                        <ProductGrid data={data.data} page='tag'/>
                        <Stack alignItems='center' sx={{marginBottom:3, width:'100%'}}>
                            <Pagination count={Math.ceil(data.productCount/12)} page={page} onChange={handlePage} color='primary' siblingCount={0} />
                        </Stack>
                        <ScrollToTop>
                            <Fab color="primary" size="small" aria-label="scroll back to top" sx={{display:{md:'none', xs:'flex'}}}>
                                <KeyboardArrowUp />
                            </Fab>
                        </ScrollToTop>
                    </>
                    :
                    <Stack sx={{alignItems:'center', justifyContent:'center'}}>
                        <SvgMsg img={svg1} msg={'No results found!'}/>
                    </Stack>
                }
                </>
            }
        </>
    )
}

export default CategoryPage
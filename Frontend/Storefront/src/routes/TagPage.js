import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useGetCategoryQuery } from '../services/Prod'
import { Grid, Skeleton, Stack, Fab } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import ProductGrid from '../components/Product/ProductGrid'
import ScrollToTop from '../components/ScrollToTop'
import Hero from '../components/TagPage/Hero'
import { Helmet } from 'react-helmet-async';
import ProductSort from '../components/Product/ProductSort'
import svg2 from '../assets/plant3.webp';
import SvgMsg from '../components/SvgMsg'

const TagPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let urlParams = useParams();
    console.log('tag', urlParams.tag);

    const {data, error, isLoading, isSuccess} = useGetCategoryQuery({catName:`${urlParams.tag}`, limit:0});
    // let isLoading=true;

    return (
        <>
            <Helmet>
                <title>Store : {urlParams.tag}</title>
                <meta name='description' content={`Explore products from ${urlParams.tag}`}/>
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
                    <SvgMsg img={svg2} msg={'Failed to load, please try again'}/>
                </Stack>
            }
            {isSuccess &&
                <>
                    {data.length!==0?
                    <>
                        <Hero tag={urlParams.tag}/>
                        <Stack>
                            <Stack direction='row' sx={{justifyContent:{sm:'flex-start', xs:'center'}, width:'90%', alignSelf:'center', display:{xs:'flex', sm:'flex'}, marginTop:3}}>
                                <ProductSort/>
                            </Stack>
                        </Stack>
                        <ProductGrid data={data} page='tag'/>
                        <ScrollToTop>
                            <Fab color="primary" size="small" aria-label="scroll back to top" sx={{display:{md:'none', xs:'flex'}}}>
                                <KeyboardArrowUp />
                            </Fab>
                        </ScrollToTop>
                    </>
                    :
                    <Stack sx={{marginY:5}}>
                        <SvgMsg img={svg2} msg={'No results found!'}/>
                    </Stack>
                }
                </>
            }
        </>
    )
}

export default TagPage
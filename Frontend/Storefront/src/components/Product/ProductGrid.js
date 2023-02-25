import React, {useEffect} from 'react'
import { Grid, Stack } from '@mui/material'
import ProductCard from './ProductCard'
// import Rc1 from '../RecomCard/Rc1'
import { useSelector } from 'react-redux';

const ProductGrid = ({data, page}) => {
    const skip = useSelector((state) => state.skip.value.skip);
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }, [data])
    // console.log("GRID DATA", data);
    const sortOp = useSelector((state) => state.sort.value.sort);
    const getValue = ({Price}) => Price;
    let bruh;
    if(sortOp==='Relevance'){
        bruh = data;
    }
    if(sortOp==='LowToHigh'){
        bruh = [...data].sort((a,b)=>getValue(a)-getValue(b));
    }
    if(sortOp==='HighToLow'){
        bruh = [...data].sort((a,b)=>getValue(b)-getValue(a));
    }
    return (
        <>
        {(page==='main' && skip===true) &&
            <Grid container justify="center" paddingX={0} spacing={2} sx={{mt:-2}}>
            {bruh.map(prod=>
                <Grid item xs={12} sm={6} md={4} key={prod._id}>
                    <ProductCard 
                    img={prod.BrowseImg}
                    // img={plant}
                    ratingTotal={prod.ratingTotal}
                    noRaters={prod.noOfRaters}
                    id={prod._id} name={prod.Name} cat={prod.SubCategory} price={prod.Price}/>
                </Grid>
            )}
            </Grid>
        }
        {(page==='main' && skip===false) &&
            <Grid container justify="center" paddingX={0} spacing={2} sx={{mt:-2}}>
            {data.map(prod=>
                <Grid item xs={12} sm={6} md={4} key={prod._id}>
                    <ProductCard 
                    img={prod.BrowseImg}
                    // img={plant}
                    ratingTotal={prod.ratingTotal}
                    noRaters={prod.noOfRaters}
                    id={prod._id} name={prod.Name} cat={prod.SubCategory} price={prod.Price}/>
                </Grid>
            )}
            </Grid>
        }
        {page==='tag' &&
            <Stack alignItems='center' sx={{paddingY:5, paddingX:{xs:0, sm:3}}}>
                <Grid container justify="center" paddingX={0} spacing={2} sx={{width:{xs:'80%', sm:'100%', md:'70%'}}}>
                {bruh.map(prod=>
                    <Grid item xs={12} sm={6} md={4}  key={prod._id}>
                        <ProductCard
                        img={prod.BrowseImg}
                        ratingTotal={prod.ratingTotal}
                        noRaters={prod.noOfRaters}
                        // img={plant}
                        id={prod._id} name={prod.Name} cat={prod.SubCategory} price={prod.Price}/>
                    </Grid>
                )}
                </Grid>
            </Stack>
        }
        </>
    )
}

export default ProductGrid
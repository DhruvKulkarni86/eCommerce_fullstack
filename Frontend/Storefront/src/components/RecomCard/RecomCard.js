import { Stack, Skeleton, Box } from '@mui/material'
import React, {useEffect} from 'react'
import { useGetCategoryQuery } from '../../services/Prod'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import './scroll.css';
// import Rc1 from './Rc1';
import ProductCard from '../Product/ProductCard';

const RecomCard = ({tags, skip}) => {
    console.log("SKIPS", skip);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const {data, isLoading, isSuccess} = useGetCategoryQuery({catName:`${tags}`, limit:5});
    // console.log("DATA", data);
    // let isLoading = true;
    let filterData;
    if(isSuccess===true){
        filterData = data.filter(item=>{
            return item._id !== skip;
        })
    }
    // console.log("FILTER DATA", filterData);
    return (
        <>
        {isLoading && 
            <Stack sx={{width:'90%', alignSelf:'center'}}>
                <SimpleBar autoHide={false} direction={'ltr'} >
                    <Stack direction='row' spacing={2} sx={{ width:'90%', alignSelf:'center'}}>
                            {[...Array(6)].map((input, index)=>
                                <Box key={index}>
                                    <Skeleton key={index} variant='rectangular' height={250} width={200} />
                                    <Skeleton variant='text'/>
                                </Box>
                            )}
                    </Stack>
                </SimpleBar>
            </Stack>
        }
        {isSuccess && 
            <Stack sx={{width:'90%', alignSelf:'center'}}>
                <SimpleBar autoHide={false} direction={'ltr'} >
                    <Stack direction='row' spacing={3} sx={{paddingY:1}}>
                        {/* FILTER OUT THE EXISTING PRODUCT FROM THE ARRAY */}
                            {filterData.map((item)=>
                            <Box key={item._id}>
                                <ProductCard 
                                img={item.BrowseImg}
                                // img={plant} 
                                ratingTotal={item.ratingTotal}
                                noRaters={item.noOfRaters}
                                id={item._id} 
                                name={item.Name} 
                                cat={item.SubCategory} 
                                price={item.Price} />
                            </Box>
                            )}
                    </Stack>
                </SimpleBar>
            </Stack>
        }
        </>
    )
}

export default RecomCard
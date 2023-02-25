import React from 'react'
import { Card, CardMedia, CardContent, Stack, Typography, Link, Box} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const ProductCard = ({id,img,name,cat,price, ratingTotal, noRaters}) => {
    const finalRating = Math.floor(ratingTotal/noRaters);
    return (
        <Card variant='outlined' sx={{width:'100%',height:{xs:380, md:400, sm:300}, backgroundColor:'cardBack.main'}}>
            <Link component={RouterLink} to={`/store/product/${id}`} underline='none'>
                <Box sx={{backgroundColor:'cardBack.main', display:'flex', justifyContent:'center'}}>
                    <CardMedia component='img' image={img} title={name} alt='product' sx={{height:{xs:250, sm:200, md:288}, width:{xs:'250px', sm:'200px', md:288}, objectFit:'contain', ['@media only screen and (min-width:900px) and (max-width:1250px)']: { // eslint-disable-line no-useless-computed-key
                    width: '150px'
                    }}}/>
                </Box>
            </Link>
            <CardContent>
                <Stack direction='row' 
                justifyContent='space-between'
                sx={{width:'100%', paddingX:0}}
                >
                    <Stack direction='column'>
                        <Link component={RouterLink} to={`/store/product/${id}`} underline='none'>
                            <Typography noWrap color="primary" sx={{width:{md:200}, fontSize:16, fontWeight:'medium', ['@media only screen and (min-width:900px) and (max-width:1250px)']: { // eslint-disable-line no-useless-computed-key
                    width: '100px',
                    fontSize:14
                    }
                            }}>
                                {name}
                            </Typography>
                        </Link>
                        <Typography variant='caption' color="text.secondary" sx={{width:'100%', fontSize:14}}>
                            {cat}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{fontSize:16, color:'#D23F57'}}>
                            ₹{price}
                        </Typography>
                    </Stack>
                    {(!isNaN(finalRating) && finalRating!==0) &&
                    <Box sx={{alignSelf:'center',backgroundColor:'primary.main', color:'#fff', paddingX:'5px', paddingY:'1px', borderRadius:2}}>
                        {finalRating}.0
                    </Box>       
                    }           
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ProductCard
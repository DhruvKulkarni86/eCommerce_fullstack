import React from 'react'
import { Skeleton, Grid, Box, Stack } from '@mui/material'
const MainProdSkeleton = () => {
    return (
        <Grid container rowSpacing={2} columnSpacing={3} paddingX={4} sx={{marginY:{xs:1, md:2}}}>
            <Grid item xs={12} md={6}>
                <Box sx={{backgroundColor:'pageBack.main'}}>
                    <Skeleton variant='rectangular' sx={{height:{md:500, xs:300}, width:'100%'}}/>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack direction='column' spacing={5} sx={{marginLeft:{xs:0, md:10}}}>
                    <Stack direction='column' sx={{alignItems:{xs:'initial', sm:'initial'}}}>
                        <Skeleton variant='text' height={50}/>
                        <Skeleton variant='text' width={120}/>
                    </Stack>
                    <Skeleton variant='rectangular' width={250} height={40} />
                    <Skeleton variant='rectangular' width={300} height={300} />
                </Stack>
            </Grid>
        </Grid>
    )
}

export default MainProdSkeleton
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import FilterCheck from './FilterCheck'


const FilterLeft = () => {
    return (
        <Card elevation={1} sx={{width:{xs:'100%', md:'80%'}, height:'fit-content'}}>
            <CardContent>
                <Typography variant='h6' sx={{fontSize:18}}>
                    Filters
                </Typography>
                <CardActions>
                    <FilterCheck/>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default FilterLeft
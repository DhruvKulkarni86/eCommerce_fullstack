import React from 'react'
import { Card } from '@mui/material'

const StoryCard = ({img}) => {
    return (
        <Card variant='outlined' sx={{width:'100%', height:'100%', borderColor:'primary.main',
        background:`url(${img})`, backgroundSize:{xs:'cover', sm:'cover'}, backgroundRepeat:'no-repeat', cursor:'pointer', marginTop:2
        }}>

        </Card>
    )
}

export default StoryCard
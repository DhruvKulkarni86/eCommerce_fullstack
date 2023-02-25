import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TagCard = ({title, tag, img}) => {
    const navigate = useNavigate();
    const handleCatalogue = () => {
        navigate(`/store/${tag}`)
        //navigate to tag route
    }
    return (
        <Card onClick={handleCatalogue} variant='outlined' sx={{width:300, height:150, borderColor:'primary.main', border:'3px solid',
        background:`url(${img})`, backgroundSize:{xs:'cover', sm:'cover'}, backgroundRepeat:'no-repeat', backgroundPosition:{xs:'initial', sm:'top -15px left 0px'}, cursor:'pointer'
        }}>
            <Box sx={{width:'100%', height:'100%', backdropFilter:'blur(0.5px) sepia(0.15)',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='h5' textAlign='center' sx={{fontSize:{xs:30, sm:40}, background: "-webkit-linear-gradient(75deg, #134E5E 24%, #71B280 64%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily:'Orelega One',}}>
                    {title}
                </Typography>
            </Box>
        </Card>
    )
}

export default TagCard
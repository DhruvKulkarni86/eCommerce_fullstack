import React, {useEffect} from 'react'
import { Stack, Typography, Box } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper";
import { Helmet } from 'react-helmet-async';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../components/StoreLand/swiperStyle.css'

import StoryCard from '../components/StoryCard';

const Story = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Stack direction='column' alignItems='center' spacing={5} sx={{width:{sm:'100%', xs:'100%'}, paddingX:{sm:5}, paddingBottom:2, alignSelf:'center', marginTop:3}}>
            <Helmet>
                <title>About Us</title>
                <meta name='description' content='Our story @ Balaji Nursery & Farms'/>
            </Helmet>
            <Typography textAlign='center' variant='h1' sx={{
                fontWeight:'medium', alignSelf:'center', cursor:'default', 
                color:'primary.main',
                fontFamily:'Poppins', 
                fontSize:{xs:20, sm:25}, marginTop:0,
            }}>
                Our Story
            </Typography>
            <Box sx={{width:{xs:'95%', md:'70%', sm:'90%' }, height:{xs:200, sm:300, md:400}}}>
            <Swiper
                direction={'vertical'}
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                mousewheel={true}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination, Mousewheel]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <StoryCard img={'https://firebasestorage.googleapis.com/v0/b/fb-auth-911fe.appspot.com/o/caro3.webp?alt=media&token=afa8dd5b-1d62-4fe8-966d-6ada21899ed2'} />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryCard img={'https://firebasestorage.googleapis.com/v0/b/fb-auth-911fe.appspot.com/o/caro5.webp?alt=media&token=70be3401-bbf7-42b8-ad37-6ea2c04efb0a'} />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryCard img={'https://firebasestorage.googleapis.com/v0/b/fb-auth-911fe.appspot.com/o/caro4.webp?alt=media&token=c0b836a6-8896-4474-aaa8-ec36ac2511a9'} />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryCard img={'https://firebasestorage.googleapis.com/v0/b/fb-auth-911fe.appspot.com/o/caro.webp?alt=media&token=767d1c14-0d25-4502-8f18-5a19def0aba4'} />
                </SwiperSlide>
            </Swiper>
            </Box>
            <Stack sx={{marginTop:5}}>
                <Typography component='div' paragraph sx={{alignSelf:'center', width:'70%', fontSize:18}}>
                <Typography sx={{display:'inline-block', fontWeight:'medium', fontSize:20}}>
                    Balaji Nursery & Farms (Kudasan, Gandhinagar)
                </Typography>
                with over five branches, are a leading name engaged in providing a wide range of plants and gardening supplies to their clients. We aim at building an excellent reputation and growing our business by selling beautiful plants that you can decorate your homes & veranda with. Our team of experienced horticulturists and gardeners ensure that the best possible quality plants, shrubs and other associated products are made available from our end. 
                </Typography>
                <Typography paragraph sx={{alignSelf:'center', width:'70%', fontSize:18}}>
                Our expertise in estimating, construction, project management and reconstruction services ensures that our customers receive a quality product at a fair price and in a reasonable time frame. 
                </Typography>
            </Stack>
        </Stack>
    )
}

export default Story
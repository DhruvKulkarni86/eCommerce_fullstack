import React from 'react'
import { Stack, Typography } from '@mui/material'
import TagCard from './TagCard'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './swiperStyle.css';

const giftImg = 'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'

const popImg = 'https://images.unsplash.com/photo-1547516508-e910d368d995?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'

const budgetImg = 'https://images.unsplash.com/photo-1578181536335-08e2f148db59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'

const decorImg = 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'

const gardeningImg = 'https://images.unsplash.com/photo-1433208406127-d9e1a0a1f1aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'

const maintImg = 'https://images.unsplash.com/photo-1546387903-6d82d96ccca6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'

const TagHero = () => {
    return (
        <Stack direction='column' alignItems='center' spacing={5} sx={{width:{sm:'100%', xs:'90%'}, paddingX:{sm:5}, paddingBottom:2, alignSelf:'center'}}>
            <Typography textAlign='center' variant='h1' sx={{
                fontWeight:'medium', alignSelf:'center', cursor:'default', 
                color:'primary.main',
                fontFamily:'Poppins', 
                fontSize:{xs:20, sm:25}, marginTop:0,
            }}>
                Explore across
            </Typography>
{/* responsive */}
            <Swiper
                breakpoints={{
                    640:{
                        slidesPerView:3,
                        slidesPerGroup:3
                    },
                }}
                slidesPerView={1}
                spaceBetween={5}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <TagCard title='Gifting' img={giftImg} tag='Gifting' />
                </SwiperSlide>
                <SwiperSlide>
                    <TagCard title='Popular' img={popImg} tag='Popular' />
                </SwiperSlide>
                <SwiperSlide>
                    <TagCard title='Budget' img={budgetImg} tag='Budget' />
                </SwiperSlide>
                <SwiperSlide>
                    <TagCard title='Decor' img={decorImg} tag='Decor' />
                </SwiperSlide>
                <SwiperSlide>
                    <TagCard title='Gardening' img={gardeningImg} tag='Gardening' />
                </SwiperSlide>
                <SwiperSlide>
                    <TagCard title='Low Maintenance' img={maintImg} tag='Low-Maintenance' />
                </SwiperSlide>
            </Swiper>
        </Stack>
    )
}

export default TagHero
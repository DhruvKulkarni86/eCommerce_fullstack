import { Stack } from '@mui/material'
import React, {useEffect} from 'react'
import Hero from './Hero';
import CatHero from './CatHero';
import IconHero from './IconHero';
import TagHero from './TagHero';

const MainStack = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Stack direction='column' spacing={5} sx={{paddingY:2,}}>
            <Hero/>
            <CatHero/>
            <TagHero/>
            <IconHero/>
        </Stack>
    )
}

export default MainStack


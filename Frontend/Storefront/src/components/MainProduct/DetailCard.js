import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import LandscapeIcon from '@mui/icons-material/Landscape';
import Spade from '../../icons/Spade';
import Can from '../../icons/Can';
import StraightenIcon from '@mui/icons-material/Straighten';
import FlareIcon from '@mui/icons-material/Flare';
import StyleIcon from '@mui/icons-material/Style';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

const DetailCard = ({details, cat}) => {
    // const keys = Object.keys(details);
    // console.log("JEY", keys);
    // for (const [key, value] of Object.entries(details)){
    //     console.log(`${key}, ${value}`);
    // }
    return (
        <>
        {cat==='Plant' &&    
        <Card variant='outlined' sx={{width:{md:'50%', sm:'100%'}}}>
            <Stack direction={{xs:'column', md:'column', sm:'row'}} justifyContent='space-around'>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <LightModeIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Light Needed:                       
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.Light}                            
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <Spade color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Maintenance:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.Maintenance}                          
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <Can color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Watering:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                Water {details.Watering}                       
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <LandscapeIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Where to Grow:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.WhereToGrow}                 
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
        }
        {cat==='Planters' &&
        <Card variant='outlined' sx={{width:{md:'50%', sm:'100%'}}}>
            <Stack direction={{xs:'column', md:'column', sm:'row'}} justifyContent='space-around'>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <StyleIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Material:                       
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.Material}                            
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <FlareIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Build:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.Build}                          
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <StraightenIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Planter Height:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.PlanterHeight}                       
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <StraightenIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Planter Width:                                                    
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.PlanterWidth}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
        }
        {cat==='Seeds' && 
        <Card variant='outlined' sx={{width:{md:'50%', sm:'100%'}}}>
            <Stack direction={{xs:'column', md:'column', sm:'row'}} justifyContent='space-around'>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <WbSunnyIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Light Needed:                       
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.Light}                            
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <Spade color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Maintenance:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.Maintenance}                          
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <MoreTimeIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Time till harvest:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.TimeTillHarvest}                       
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <Can color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Watering:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                Water {details.Watering}                       
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <LandscapeIcon color='primary'/>
                        <Box>
                            <Typography variant='body1' color='primary'>
                                Where to Grow:                          
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                                {details.WhereToGrow}                 
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
        }
        {cat==='Care' &&
        <>
            <Typography textAlign='left' paragraph sx={{fontSize:18, textAlign:{xs:'center', sm:'left'}}}>
                {details.Description}
            </Typography>
        </>
        }
        </>
    )
}

export default DetailCard

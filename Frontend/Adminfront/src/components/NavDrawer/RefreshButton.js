import React from 'react'
import { Stack, Typography } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';

const RefreshButton = () => {
    return (
        <Stack direction='row' spacing={2} 
        sx={{width:'fit-content', border:'0', borderRadius:0.8, paddingX:1, paddingY:1, alignSelf:'flex-start', color:'primary.main', cursor:'pointer',
        transition:'ease-in',
        transitionDuration:'0.1s',
        '&:hover':{
            sm:{transform:'scale(1.03)'},
        }
        }}
        onClick={() => window.location.reload(false)}
        >
            <RefreshIcon/>
            <Typography variant='h6' sx={{fontSize:16, fontFamily:'inter'}}>
                Refresh Data
            </Typography>
        </Stack>
    )
}

export default RefreshButton
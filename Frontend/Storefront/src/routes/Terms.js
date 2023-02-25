import { List, Stack, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, {useEffect} from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Stack spacing={2} sx={{justifyContent:'flex-start', alignItems:{xs:'center', sm:'flex-start'}, marginTop:3, marginLeft:{xs:0, sm:3}}}>
            <Helmet>
                <title>Terms and Conditions</title>
                <meta name='description' content='Terms and Conditions'/>
            </Helmet>
            <Typography variant='h1' sx={{fontSize:30, fontWeight:'medium'}}>
                Terms and Conditions
            </Typography>
            <List sx={{width:'80%', alignSelf:{xs:'center', sm:'flex-start'}}}>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <CircleIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='No Returns.'/>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <CircleIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText primary='No Refunds.'/>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <CircleIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText primary='No Cancellations.'/>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <CircleIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText primary='Delivery Time is estimate only. It may take longer due to logistics issues.'/>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <CircleIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText primary='All and any disputes will be subjected to Gandhinagar and Ahmedabad jurisdiction only.'/>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <CircleIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText primary='Currently delivering in Ahmedabad and Gandhinagar only.'/>
                </ListItem>
            </List>
        </Stack>
    )
}

export default Terms
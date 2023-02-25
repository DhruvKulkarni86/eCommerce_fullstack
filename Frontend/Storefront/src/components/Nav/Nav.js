import React from 'react';
import { Link, AppBar, Box, Toolbar, Typography, Container, Button, Divider, useScrollTrigger } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavAccountSettings from './NavAccountSettings';
import NavSignUpAccountSettings from './NavSignUpAccountSettings';
import CartIco from '../Cart/CartIco';
import CatalogueMenu from '../Catalogue/CatalogueMenu';
import NavResponsiveMenu from './NavResponsiveMenu';
import SearchDialog from '../Search/SearchDialog';

const Nav = () => {
    const trigger = useScrollTrigger({
        disableHysteresis:true,
        threshold:0
    });
    let isLoggedIn = useSelector((state)=>state.user.value.currentUser);
    return(
    <AppBar position='sticky' color="common" elevation={trigger?6:1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
{/* Main Logo */}
                <Link underline="none" component={RouterLink} to="/store">
                    <Typography
                        color="primary"
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ mr: 2, cursor: 'pointer', fontWeight:'bold', display:{xs: 'none', md: 'flex',background: "-webkit-linear-gradient(45deg, #134E5E 24%, #71B280 64%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}}
                    >
                        Balaji Nursery & Farms
                    </Typography>
                </Link>
{/* end Main Logo */}
{/* Responsive + Menu */}
                <NavResponsiveMenu logged={isLoggedIn} />
{/* Responsive + Menu  end*/}
{/* responsive title */}
                <Typography
                    variant="h6"
                    color="primary"
                    noWrap
                    component="h1"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontSize:{xs:18, sm:25}}}
                >
                    <Link to="/store" component={RouterLink} underline='none'>
                        Balaji Nursery & Farms
                    </Link>
                </Typography>
{/* responsive title end */}
{/* main appbar */}
                <Box sx={{ flexGrow: 1, mr:'5px', justifyContent:'flex-end', display: { xs: 'none', md: 'flex' } }}>
                    <SearchDialog/>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{mt:2.5, height:'25px'}} />
                    <Button sx={{ my: 2, display: 'block' }}>
                        <CatalogueMenu/>
                    </Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{mt:2.5, height:'25px'}} />
                </Box>
{/* sign in button start */}
                {isLoggedIn?
                    <NavAccountSettings />
                    :
                    <NavSignUpAccountSettings />
                }
{/* sign in button end */}
                <Divider orientation="vertical" variant="middle" flexItem sx={{mt:2.5, height:'25px', display: {xs:'none', md:'flex'}}} />
{/* cart */}
                <Box sx={{ flexGrow: 1, mr:'0px', justifyContent:'flex-end', display: { xs: 'flex', md: 'none'} }}>
                    <SearchDialog/>
                </Box>
                <CartIco/>
            </Toolbar>
        </Container>
    </AppBar>
    )
}

export default Nav;

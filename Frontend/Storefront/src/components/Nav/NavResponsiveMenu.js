import React from 'react'
import { Box, IconButton, Menu, MenuItem, Link, ListItemIcon, ListItemText } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import NavAccSettingsRes from './NavAccSettingsRes';
import { useDispatch } from 'react-redux';
import {skip} from '../../features/skip';
import { checked } from '../../features/filter';
import InventoryIcon from '@mui/icons-material/Inventory';
import LoginIcon from '@mui/icons-material/Login';

const NavResponsiveMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let isLoggedIn = useSelector((state)=>state.user.value.currentUser);
    // console.log("IS LOggED IIN", isLoggedIn);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCatalogue = () => {
        setAnchorElNav(null);
        dispatch(checked({
            filters:null,
        }))
        dispatch(skip({
            skip:false
        }))
        navigate('/store/catalogue', {replace:true})
    }
    return (
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="medium"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon color='primary' />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                            <MenuItem onClick={handleCatalogue}>
                                <ListItemIcon>
                                    <InventoryIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText sx={{color:'primary.main'}}>
                                    Catalogue
                                </ListItemText>
                            </MenuItem>
                        {/* <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Help Center</Typography>
                        </MenuItem> */}
                        {isLoggedIn===true
                            ?
                            <NavAccSettingsRes close={handleCloseNavMenu}/>
                            :
                            <Link underline="none" color='initial' component={RouterLink} to="/signin">
                                <MenuItem onClick={handleCloseNavMenu}>
                                <ListItemIcon>
                                    <LoginIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText sx={{color:'primary.main'}}>
                                    Sign In
                                </ListItemText>
                                </MenuItem>
                            </Link>
                        }
                    </Menu>
        </Box>
    )
}

export default NavResponsiveMenu
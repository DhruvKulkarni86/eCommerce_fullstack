import React from 'react'
import { Fade, Link, Menu, MenuItem, Box, Tooltip, IconButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const NavSignUpAccountSettings = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0, mr:0}}>
        <Tooltip title="Sign Up">
            <IconButton aria-label="account" onClick={handleOpenUserMenu} sx={{ml:'-5px', paddingX:'8px',display:{xs:'none', md:'flex'}}}>
                <PersonIcon color="primary" fontSize='medium'/>
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ marginTop:2, elevation:0 }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            TransitionComponent={Fade}
            transitionDuration={500}
        >
            <Link underline="none" color="initial" component={RouterLink} to="/signup">
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <PersonAddAlt1Icon color='primary'/>
                    </ListItemIcon>
                    <ListItemText sx={{color:'primary.main'}}>
                        Sign Up
                    </ListItemText>
                </MenuItem>
            </Link>
            <Link underline="none" color="initial" component={RouterLink} to="/signin">
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <LoginIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText sx={{color:'primary.main'}}>
                        Sign In
                    </ListItemText>
                </MenuItem>
            </Link>
        </Menu>
    </Box>
    )
}

export default NavSignUpAccountSettings
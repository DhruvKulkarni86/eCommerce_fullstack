import React from 'react'
import { Link, Menu, MenuItem, Box, Tooltip, IconButton, Avatar, ListItemIcon, ListItemText } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authLogout } from '../../services/Functions/AuthFunc';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user';
import { clearCart } from '../../features/cart';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import { open } from '../../features/open';

const NavAccountSettings = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const uname = useSelector((state)=>state.user.value.userName);
    // if(uname!==undefined){
    //     const bruh = uname.split(' ').map(i => i.charAt(0)).toUpperCase(); 
    //     console.log('bruh', bruh);
    // }

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setAnchorElUser(null);
        authLogout().then(()=>{
            dispatch(logout())
            dispatch(clearCart())
            localStorage.clear()
            navigate("/", {replace:true})
            dispatch(open({
                open:true
            }))
        })
    }
    return (
        <Box sx={{ flexGrow: 0, mr:'5px'}}>
            <Tooltip title="Your Account">
                <IconButton aria-label="account" onClick={handleOpenUserMenu} sx={{ml:'0px', padding:'0px',display:{xs:'none', md:'flex'}}}>
                    {/* <AccountCircleOutlinedIcon color="primary" fontSize='medium'/> */}
                    <Avatar sx={{bgcolor:'#085c25', width:32, height:32, fontSize:15}}>
                        {uname.split(' ').map((item) => item.charAt(0)).join('').toUpperCase()}
                    </Avatar> 
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px', display:{xs:'none', md:'block'} }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Link underline="none" color="initial" component={RouterLink} to="/dash">
                    <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText sx={{color:'primary.main'}}>
                            {uname.split(" ")[0]}
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Link underline="none" color="initial" component={RouterLink} to="/orders">
                    <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <LocalShippingIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText sx={{color:'primary.main'}}>
                            Orders
                        </ListItemText>
                    </MenuItem>
                </Link>
                {/* <Link underline="none" color="initial" component={RouterLink}> */}
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText sx={{color:'primary.main'}}>
                            Logout
                        </ListItemText>
                    </MenuItem>
                {/* </Link> */}
            </Menu>
    </Box>
    )
}

export default NavAccountSettings
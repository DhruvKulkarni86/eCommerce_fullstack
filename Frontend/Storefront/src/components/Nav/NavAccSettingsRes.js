import React from 'react'
import { MenuItem, Link, ListItemIcon, ListItemText } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/user'
import { authLogout } from '../../services/Functions/AuthFunc'
import { clearCart } from '../../features/cart'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import { open } from '../../features/open';

const NavAccSettingsRes = ({close}) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const uname = useSelector((state)=>state.user.value.userName);
    const handleLogout = () => {
        authLogout().then(()=>{
            close()
            dispatch(logout())
            dispatch(clearCart())
            localStorage.clear();
            navigate("/", {replace:true})
            dispatch(open({
                open:true
            }))
        })
    }
    return (
        <>
            <Link underline="none" color='initial' component={RouterLink} to="/dash">
                <MenuItem onClick={close}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText sx={{color:'primary.main'}}>
                        {uname.split(" ")[0]}
                    </ListItemText>
                </MenuItem>
            </Link>
            <Link underline="none" color='initial' component={RouterLink} to="/orders">
                <MenuItem onClick={close}>
                    <ListItemIcon>
                        <LocalShippingIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText sx={{color:'primary.main'}}>
                        Orders
                    </ListItemText>
                </MenuItem>
            </Link>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText sx={{color:'primary.main'}}>
                        Logout
                    </ListItemText>
                </MenuItem>
        </>
    )
}

export default NavAccSettingsRes
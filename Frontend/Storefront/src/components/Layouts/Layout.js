import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import StoreTheme from '../../themes/StoreTheme';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { Box } from '@mui/material';

const Layout = () => {
    return (
        <ThemeProvider theme={StoreTheme}>
            <Nav/> 
            <Box sx={{minHeight:'100vh'}}>
                <Outlet />
            </Box>
            <Footer/>
        </ThemeProvider>
    )
}
export default Layout;

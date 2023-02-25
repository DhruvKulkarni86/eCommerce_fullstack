import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import ProductDrawer from '../Product/ProductDrawer'
const ProdLayout = () => {
    return (
        <Box sx={{backgroundColor:'pageBack.main', minHeight:'100vh'}}>
            {/* Drawer for resp screen */}
            <ProductDrawer/>
            <Outlet/>
        </Box>
    )
}

export default ProdLayout
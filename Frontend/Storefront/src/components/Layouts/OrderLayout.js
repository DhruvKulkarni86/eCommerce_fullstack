import React from 'react'
import { Outlet } from 'react-router-dom'
import CartStepper from '../Cart/CartStepper'
import { Stack } from '@mui/material'

const OrderLayout = () => {
    return (
        <>
            <Stack alignItems='center' sx={{paddingX:1}}>
                <CartStepper/>
            </Stack>
            <Outlet/>
        </>
    )
}

export default OrderLayout
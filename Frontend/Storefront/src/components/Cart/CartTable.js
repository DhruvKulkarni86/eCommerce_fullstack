import React from 'react'
import { Table, TableContainer, Paper, TableBody, TableRow, TableCell, TableHead } from '@mui/material'

const CartTable = ({data, totalPrice, variant}) => {
    // console.log("CART TABLE DATA", data);
    return (
        <>
        <TableContainer component={Paper} variant='outlined'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' colSpan={2} sx={{fontWeight:'bold'}}>
                            Item Summary
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <>
                    {variant==='cart' ?
                    <>
                        {data.map((item)=>(
                            <TableRow key={item.productName}>
                                <TableCell>
                                    {item.productName}
                                </TableCell>
                                <TableCell align='right'>
                                    {item.productQty} x {item.productPrice} = ₹{item.productPrice*item.productQty}
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                        :
                    <>
                        {data.map((item)=>(
                            <TableRow key={item.productName}>
                                <TableCell>
                                    {item.productName}
                                </TableCell>
                                <TableCell align='right'>
                                    {item.productQty} x {item.Price} = ₹{item.Price*item.productQty}
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                    }
                    </>
                    <TableRow>
                        <TableCell sx={{fontWeight:'bold', color:'primary.main'}}>
                            Grand Total
                        </TableCell>
                        <TableCell align='right' sx={{fontWeight:'bold', color:'primary.main'}}>
                            ₹{totalPrice}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default CartTable
import { Stack, Typography, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../../features/cart';
const Quantity = ({qty, id}) => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(updateQuantity({
            productId : id,
            productQty: Number(e.target.value),
        }))
    }
    return (
        <Stack direction='row' spacing={2}>
            <Typography variant='subtitle2'>
                Qty:
            </Typography>
            <FormControl size='small'>
                    <Select
                        displayEmpty
                        defaultValue={qty}
                        value={qty}
                        onChange={handleChange}
                    >
                        <MenuItem  value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                    </Select>
            </FormControl>
        </Stack>
    )
}

export default Quantity
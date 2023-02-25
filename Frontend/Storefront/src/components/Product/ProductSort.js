import React from 'react'
import {  FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { sorted } from '../../features/sort';

const ProductSort = () => {
    const dispatch = useDispatch();
    // const [sortOp, setSortOp] = useState('Relevance');
    const sortOp = useSelector((state) => state.sort.value.sort);
    // console.log("SORT", sortOp);
    const handleChange = (event) => {
        dispatch(sorted({
            sort:event.target.value
        }));
        // setSortOp(event.target.value);
    };
    return (
        <>
            {sortOp &&
                <FormControl fullWidth sx={{maxWidth:230, marginY:{xs:2, md:0}, marginX:{xs:0.5}}}>
                    <InputLabel>Sort By:</InputLabel>
                    <Select
                        displayEmpty
                        defaultValue={'Relevance'}
                        value={sortOp}
                        label='Sort By:'
                        onChange={handleChange}
                    >
                        <MenuItem  value={'Relevance'}>Relevance</MenuItem>
                        <MenuItem value={'LowToHigh'}>Price Low To High</MenuItem>
                        <MenuItem value={'HighToLow'}>Price High To Low</MenuItem>
                    </Select>
                </FormControl>
            }
        </>    
    )
}

export default ProductSort
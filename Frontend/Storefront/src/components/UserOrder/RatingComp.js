import React, {useState} from 'react'
import { Stack, Rating, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';

const RatingComp = (item) => {
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false);

    const sendRating = () => {
        setLoading(true)
        let token = localStorage.getItem('userToken');
        axios({
            url:`${process.env.REACT_APP_BACK_URL}/customer/productRating`,
            headers:{
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data:{
                'pid':item.item.productId,
                'rating':value
            },
            method:"POST"
        }).then((res)=>{
            // console.log("RES", res);
            alert('Rating Submitted')
        }).catch((err)=>{
            alert(err)
        })
    }

    return (
        <Stack direction='row' key={item.item.productId} spacing={1}>
            {item.item.productName}:
            <Rating
                defaultValue={0}
                value={value}
                name='rating'
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
            <IconButton onClick={sendRating} disabled={loading} sx={{alignSelf:'center'}}>
                <DoneIcon/>
            </IconButton>
        </Stack>
    )
}

export default RatingComp
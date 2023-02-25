import { Stack, Skeleton } from '@mui/material';
import React from 'react'
import OrderCard from '../components/UserOrder/OrderCard';
import { auth } from '../firebase/config';
import { useGetOrdersQuery } from '../services/Prod'


const UserOrder = () => {
    let token = localStorage.getItem('userToken');
    const {data, error, isLoading, isError,  isSuccess, refetch} = useGetOrdersQuery(`${token}`)
    // console.log("ORDER ERROR", error);
    // console.log("ORDER DATA", data);
    // console.log("IS RROR", isError);
    // let isLoading=true;
    if(isError===true){
        if(error.originalStatus===401){
            auth.currentUser.getIdToken().then((token)=>{
                localStorage.setItem("userToken", token)
                // console.log("NEW TOKEN");
                refetch();
            })
        }
    }
    
    return (
        <>
        {isLoading && 
            <Stack justifyContent='center' sx={{width:'100%'}}>
                {[...Array(12)].map((input, index)=>
                    <Skeleton variant='rectangular' key={index} height={250} sx={{marginBottom:2}} />
                )}
            </Stack>
        }
        {isSuccess && 
            <Stack sx={{width:{xs:'100%', sm:'80%'}, marginX:{xs:0, sm:2}, marginTop:2}}>
                {data.map(data=>
                    <OrderCard data={data} key={data._id}/>
                )}
            </Stack>
        }
        </>
    )
}

export default UserOrder
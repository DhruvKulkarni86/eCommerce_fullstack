import React from "react";
import { Outlet } from "react-router-dom";
// import MainCatImg from "../components/StoreFront/MainCatImg";
import MainStack from '../components/StoreLand/MainStack';
import { Helmet } from 'react-helmet-async';

const StoreLanding = () => {
    return (
        <>
            <Helmet>
                <title>Balaji Nursery & Farms</title>
                <meta name='description' content='Balaji Nursey and Farms storefront'/>
            </Helmet>
            {/* <MainCatImg/> */}
            <MainStack/>
            <Outlet/>
        </>
    )
}

export default StoreLanding
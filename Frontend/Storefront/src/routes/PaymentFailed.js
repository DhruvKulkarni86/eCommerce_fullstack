import React from 'react'
import SvgMsg from '../components/SvgMsg'
import svg1 from '../assets/plant2.webp';

const PaymentFailed = () => {
    return (
        <SvgMsg img={svg1} msg='Oops! Your payment failed, please try again!'/>
    )
}

export default PaymentFailed
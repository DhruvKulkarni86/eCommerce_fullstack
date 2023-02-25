import React from 'react'
import SvgMsg from '../components/SvgMsg'
import svg1 from '../assets/plant4.webp';

const RedirectPass = () => {
    return (
        <SvgMsg img={svg1} msg='A password reset link has been sent to your regiestered email address.'/>
    )
}

export default RedirectPass
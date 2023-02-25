import React from 'react'
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useSelector } from 'react-redux';

const steps = ['Cart', 'Address', 'Summary & Payment'];

const CartStepper = () => {
    // const [activeStep, setActiveStep] = React.useState(0);
    const step = useSelector((state)=>state.cartProg.value.cartProg);

    return (
        <Box sx={{ width:{md:'50%', sm:'80%', xs:'100%'}, paddingTop:2, paddingBottom:1, display:{sm:'block', xs:'none'} }}>
            <Stepper activeStep={step}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    )
}

export default CartStepper
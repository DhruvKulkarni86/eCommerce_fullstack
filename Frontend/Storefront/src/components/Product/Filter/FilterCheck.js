import React, { useEffect, useState } from "react";
import { Box, Button, FormGroup, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { checked } from "../../../features/filter";
import {prodApi} from '../../../services/Prod';
import {skip} from "../../../features/skip";

function FilterCheck() {
    const heroes = ['Medicinal', 'Outdoor', 'Office', 'Planter', 'Seeds'];
    const [checkedValues, setCheckedValues] = useState([]);

    const cvProps = { heroes, checkedValues, setCheckedValues };

    return (
        <Box sx={{width:'100%'}}>
            <CheckedValues {...cvProps} />
        </Box>
    );
}

function CheckedValues(props) {
    const [apply, setApply] = useState(false)
    // const skipST = useSelector((state) => state.skip.value.skip);
    const dispatch = useDispatch();
    const [trigger,
        { 
            data: prodData,
            // isError,
            // error
        },
    ] = prodApi.endpoints.getCategory.useLazyQuery();
    // console.log("FLT PROD DATA", prodData);
    // console.log("ERROR", error);
    // console.log("IS RROR", isError);

    const handleTrig = () => {
        trigger({catName:`${props.checkedValues.toString()}`, limit:0})
            dispatch(checked({
                filters:null,
            }))
            dispatch(skip({
                skip:true
            }))
    }
    useEffect(()=>{
        dispatch(checked({
            fltProd: prodData
        }))
    },[dispatch, prodData])

    const handleChecked = e => {
        const hero = props.heroes[e.target.dataset.id];
        let newCheckedValues = props.checkedValues.filter(item => item !== hero);
        if (e.target.checked) newCheckedValues.push(hero);
        props.setCheckedValues(newCheckedValues);
        setApply(false)
    };

    const sendVal = () => {
        setApply(true)
        let chek = props.checkedValues;
        dispatch(checked({
            filters : chek
        }))
        handleTrig()
        if(props.checkedValues.length===0){
            dispatch(skip({
                skip:false
            }))
        }
    }

    return (
        <FormGroup>
            {props.heroes.map((hero, id) => (
                <label key={id}>
                    <Typography color="text.primary" variant='h6' sx={{fontSize:16, marginY:0.5}}>
                    <input type="checkbox" data-id={id} onClick={handleChecked} /> 
                    {hero}
                    </Typography>
                </label>
            ))}
            {apply === true ?
                <Button disabled type='submit' variant='contained' onClick={sendVal} sx={{alignSelf:'flex-end'}}>
                    Apply
                </Button>
            :
                <Button type='submit' variant='contained' onClick={sendVal} sx={{alignSelf:'flex-end'}}>
                    Apply
                </Button>
            }
        </FormGroup>
    );
    }

export default FilterCheck;
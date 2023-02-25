import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    filters:null,
    fltProd:null
};

export const filterSlice = createSlice({
    name: "filter",
    initialState: {value: initialStateValue},
    reducers:{
        checked: (state, action) => {
            state.value = action.payload
        },
        // unchecked:(state, action) => {
        //     state.value = action.payload
        // }
    }
});

export const {checked} = filterSlice.actions;
export default filterSlice.reducer;
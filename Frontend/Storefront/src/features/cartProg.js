import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    cartProg:0
};

export const cartProgSlice = createSlice({
    name: "cartProg",
    initialState: {value: initialStateValue},
    reducers:{
        prog: (state, action) => {
            state.value = action.payload
        },
        // unchecked:(state, action) => {
        //     state.value = action.payload
        // }
    }
});

export const {prog} = cartProgSlice.actions;
export default cartProgSlice.reducer;
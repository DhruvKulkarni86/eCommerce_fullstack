import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    sort:'Relevance',
}

export const sortSlice = createSlice({
    name:'sort',
    initialState:{value: initialStateValue},
    reducers:{
        sorted:(state, action) => {
            state.value = action.payload
        },   
    }
});

export const {sorted} = sortSlice.actions;
export default sortSlice.reducer;
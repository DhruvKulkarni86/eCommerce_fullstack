import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    open:false
};

export const openSlice = createSlice({
    name: "open",
    initialState: {value: initialStateValue},
    reducers:{
        open: (state, action) => {
            state.value = action.payload
        },
    }
});

export const {open} = openSlice.actions;
export default openSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    skip:false
};

export const skipSlice = createSlice({
    name: "skip",
    initialState: {value: initialStateValue},
    reducers:{
        skip: (state, action) => {
            state.value = action.payload
        },
    }
});

export const {skip} = skipSlice.actions;
export default skipSlice.reducer;
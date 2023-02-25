import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    fetched:false
};

export const dataFetchSlice = createSlice({
    name: "dataFetch",
    initialState: {value: initialStateValue},
    reducers:{
        fetch: (state, action) => {
            state.value = action.payload
        },
    }
});

export const {fetch} = dataFetchSlice.actions;
export default dataFetchSlice.reducer;
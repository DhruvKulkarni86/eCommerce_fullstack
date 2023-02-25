import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    userId: null,
    userName: null,
    userEmail: null,
    currentUser: false,
    authType:null
};

export const userSlice = createSlice({
    name: "user",
    initialState: {value: initialStateValue},
    reducers:{
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialStateValue;
        },
        updateName:(state, action)=>{
            state.userName = action.payload
        }
    }
});

export const {login, logout, updateName} = userSlice.actions;
export default userSlice.reducer;
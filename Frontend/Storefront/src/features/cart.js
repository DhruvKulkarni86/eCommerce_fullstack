import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem('cartItems')):[],
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem('totalItems')):0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: {value: initialStateValue},
    reducers:{
        add: (state, action) => {
            // const itemIndex = state.value.cartItems.findIndex((item)=>item.id===action.payload.id);
            // if(itemIndex<0){
            if(state.value.cartItems.some(e=>e.productId === action.payload.productId)){
                console.log("EXISTSTST");
            }
            else{
                const tempProduct = {...action.payload};
                state.value.cartItems.push(tempProduct)
                state.value.totalItems+=1
            }
            // }
            localStorage.setItem("cartItems", JSON.stringify(state.value.cartItems))
            localStorage.setItem("totalItems", JSON.stringify(state.value.totalItems))
        },
        deleteFromCart: (state, action) => {
            state.value.cartItems.map((cartItem)=>{
                if(cartItem.productId === action.payload){
                    const nextCartItems = state.value.cartItems.filter(
                        (cartItem) => cartItem.productId !== action.payload
                    )
                    state.value.cartItems = nextCartItems;
                    state.value.totalItems--
                }
                localStorage.setItem("cartItems", JSON.stringify(state.value.cartItems));
                localStorage.setItem("totalItems", JSON.stringify(state.value.totalItems))
                return state;
            })
        },
        updateQuantity: (state, action) => {
            state.value.cartItems.map((cartItem)=>{
                if(cartItem.productId === action.payload.productId){
                    cartItem.productQty = action.payload.productQty;
                }
                localStorage.setItem("cartItems", JSON.stringify(state.value.cartItems));
                return state;
            })
        },
        clearCart: (state, action) => {
            state.value.cartItems = [];
            state.value.totalItems = 0;
            localStorage.setItem("cartItems", JSON.stringify(state.value.cartItems));
            localStorage.setItem("totalItems", JSON.stringify(state.value.totalItems));
        },
    }
});

export const {add, deleteFromCart, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;


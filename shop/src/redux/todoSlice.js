import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[]
}

const todoSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const itemIndex = state.cart.findIndex((item)=>item.id === action.payload.id)
            if(itemIndex>=0){
                state.cart[itemIndex].qnty +=1 
            }else{
                const temp = {...action.payload,qnty:1}
                state.cart = [...state.cart,temp]
            }
         
            // console.log(action)
        },
        removeToCart:(state,action)=>{
          const data = state.cart.filter((ele)=>ele.id !== action.payload)
          state.cart = data
        },
        removeSingleItem:(state,action)=>{
         const removeItemIndex = state.cart.findIndex((item)=>item.id === action.payload.id)
         if(state.cart[removeItemIndex].qnty >=1){
            state.cart[removeItemIndex].qnty -=1
         }
        },
        emptyCart:(state,action)=>{
           state.cart = []
        }

    }
})


export const { addToCart, removeToCart, removeSingleItem, emptyCart } = todoSlice.actions
export default todoSlice.reducer
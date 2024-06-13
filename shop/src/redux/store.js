import { configureStore } from "@reduxjs/toolkit"
import cartSlice from './todoSlice'
export const store = configureStore({
    reducer:{
        allCart:cartSlice
    }
})
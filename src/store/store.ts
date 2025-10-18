import {configureStore} from '@reduxjs/toolkit';
import cartReducer from "./Slices/cartSlice";
import produtsReducer from "./Slices/productSlice"
import categorySlice from './Slices/categorySlice';
import brandSlice from './Slices/brandSlice';

const store = configureStore({
    reducer:{
        cartReducer ,
        produtsReducer ,
        categorySlice ,
        brandSlice
    }
});

export default store;

export type StoreType = ReturnType<typeof store.getState> 

import { createSlice  , createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import type { ProductStateType} from '../../types/productType';
import { getProducts } from "@/services/productApi";

export const getProductData = createAsyncThunk("products/get" , getProducts);

const initialState:ProductStateType = {
    loading:false ,
    error:false ,
    products:[] ,
    filteredProducts:[]
} 
const productSlice = createSlice({
    name:"productSlice" ,
    initialState ,
    reducers:{
        filterByCategory:(state , action)=> {
          state.filteredProducts = state.products.filter((product)=> product.category.name == action.payload);              
        } ,
        clearTheFilter:(state)=>{
            state.filteredProducts = state.products;            
        } ,
        filterByBrand:( state , action) => {
            state.filteredProducts = state.products.filter((product)=> product.brand.name == action.payload);
        },
        searchTheProducts:(state ,action) => {
            state.filteredProducts = state.products.filter((product)=> product.title.toLocaleLowerCase().includes(action.payload));          
        }
    } ,
    extraReducers: async function (builder) {
        builder.addCase(getProductData.pending , (prevState )=> {
            prevState.loading=true ,
            prevState.error=true
        })
        builder.addCase(getProductData.rejected , (prevState)=> {
            prevState.loading=false ,
            prevState.error = true
        })
        builder.addCase(getProductData.fulfilled , (prevState , action)=> {
            prevState.loading=false ,
            prevState.error=false ,
            prevState.products = action.payload;
            prevState.filteredProducts = action.payload
        })
    }
}) 
export const {filterByCategory , filterByBrand , clearTheFilter , searchTheProducts } = productSlice.actions;
export default productSlice.reducer;
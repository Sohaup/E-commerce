import { productsStateType } from "@/types/cartTupes";
import returnToken from "@/utilities/token";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const postCartProducts = createAsyncThunk("cartSlice/add" , async function ({productId , token}:{productId:string , token:string | undefined}) {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
        method:"POST" ,
        body:JSON.stringify({productId}) ,
        headers: {
            token : typeof token == "string" ? token : ""  ,
            'content-type':'application/json' 
        }
      });
      return await response.json();  
});

export const getCartProducts = createAsyncThunk("cartSlice/get" , async function ({token}:{token:string | undefined}) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
        headers:{
            token: typeof token == "string" ? token : "" ,
        }
    });
    return await response.json();
});

export const deleteCartProduct = createAsyncThunk("cartSlice/delete" , async function ({token , productId}:{token:string | undefined , productId:string}) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
        method:"DELETE" ,
        headers:{
            token: typeof token == "string" ? token : ""
        } 
    });
    console.log(await response.json());
    

    return await response.json() ;

})

export const updateProductCartAmount = createAsyncThunk("cartSlice/update" , async function ({token , productId , count}:{token:string | undefined , productId:string , count:number}) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
        method:"PUT" ,
        headers:{
            token: typeof token == "string" ? token : ""
        }  ,
        body:JSON.stringify({count:String(count)})
    });
    console.log(await response.json());   

    return await response.json() ;
})

const initialState:productsStateType = {
        cartProducts:[] ,
        loading:false ,
        error:false
 };

const cartSlice = createSlice({
    name:"cart slice" ,
    initialState ,
    reducers:{

    } ,
    extraReducers:async function (builder) {
        builder.addCase(postCartProducts.pending , function (prevState ) {
            prevState.loading = true
        });
        builder.addCase(postCartProducts.rejected , function (prevState) {
            prevState.loading = false;
            prevState.error = true;
        });
        builder.addCase(postCartProducts.fulfilled , function (prevState , action){
            prevState.loading = false;
            prevState.error = false;
            prevState.cartProducts = action.payload?.data?.products;
            console.log(prevState.cartProducts);            
        });
        builder.addCase(getCartProducts.pending , function (prevState) {
            prevState.loading = true
        });
        builder.addCase(getCartProducts.rejected , function (prevState) {
            prevState.error = true
            prevState.loading = false
        } ) ;
        builder.addCase(getCartProducts.fulfilled , function (prevState , action) {
            prevState.cartProducts = action.payload?.data?.products;
            console.log(prevState.cartProducts);  
        });
        builder.addCase(deleteCartProduct.pending , function (prevState) {
            prevState.loading = true;
            prevState.error = false;
        })
        builder.addCase(deleteCartProduct.rejected , function(prevState) {
            prevState.loading = false;
            prevState.error = true;
        });
        builder.addCase(deleteCartProduct.fulfilled , function (prevState , action) {
          prevState.loading=false;
          prevState.error=false;
          prevState.cartProducts = action.payload?.data?.products;
        })
          builder.addCase(updateProductCartAmount.pending , function (prevState) {
            prevState.loading = true;
            prevState.error = false;
        })
        builder.addCase(updateProductCartAmount.rejected , function(prevState) {
            prevState.loading = false;
            prevState.error = true;
        });
        builder.addCase(updateProductCartAmount.fulfilled , function (prevState , action) {
          prevState.loading=false;
          prevState.error=false;
          prevState.cartProducts = action.payload?.data?.products;
        })
    }
})  


export default  cartSlice.reducer

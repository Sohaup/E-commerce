import { productsStateType } from "@/types/cartTypes";
import returnToken from "@/utilities/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



// export const postCartProducts = createAsyncThunk("cartSlice/add" , async function ({productId , token}:{productId:string , token:string | undefined}) {
//       const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
//         method:"POST" ,
//         body:JSON.stringify({productId}) ,
//         headers: {
//             token : typeof token == "string" ? token : ""  ,
//             'content-type':'application/json' 
//         }
//       });
//       return await response.json();  
// });

// export const getCartProducts = createAsyncThunk("cartSlice/get" , async function ({token}:{token:string | undefined}) {
//     const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
//         headers:{
//             token: typeof token == "string" ? token : "" ,
//         }
//     });
//     return await response.json();
// });

// export const deleteCartProduct = createAsyncThunk("cartSlice/delete" , async function ({token , productId}:{token:string | undefined , productId:string}) {
//     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
//         method:"DELETE" ,
//         headers:{
//             token: typeof token == "string" ? token : ""
//         } 
//     });
//     console.log(await response.json());


//     return await response.json() ;

// })

// export const updateProductCartAmount = createAsyncThunk("cartSlice/update" , async function ({token , productId , count}:{token:string | undefined , productId:string , count:number}) {
//     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
//         method:"PUT" ,
//         headers:{
//             token: typeof token == "string" ? token : ""
//         }  ,
//         body:JSON.stringify({count:String(count)})
//     });
//     console.log(await response.json());   

//     return await response.json() ;
// })

const initialState: productsStateType = {
    cartProducts: [],
    totalPrice: 0,
    loading: false,
    error: false,
    countOfProducts: 0
};

const cartSlice = createSlice({
    name: "cart slice",
    initialState,
    reducers: {
        getCartProducts:(prevState)=>{
             if (typeof prevState.cartProducts == "object") {                
                prevState.cartProducts = JSON.parse(localStorage.getItem("cart")!);
            }
        } ,
        AddToCart: (prevState, action) => {
            if (typeof prevState.cartProducts == "object") {                
                const newCartProducts = [...prevState.cartProducts, action.payload]
                localStorage.setItem("cart", JSON.stringify(newCartProducts));
                prevState.cartProducts = newCartProducts
            }
        },
        calcTotal: (prevState) => {
            if (typeof prevState.cartProducts == "object") {
                let total = 0;
                prevState.cartProducts.forEach((product) =>   total += product.price * product.count );           
                prevState.totalPrice = total;             
               
            }
        },
        calcAmount: (prevState) => {
            if (typeof prevState.cartProducts == "object") {               
                let amountOfProducts = 0;
                prevState.cartProducts.forEach((product)=> {
                   amountOfProducts += product.count
                });
                prevState.countOfProducts = amountOfProducts;
            }
        },
        deleteFromTheCart: (prevState, action) => {
            if (typeof prevState.cartProducts == "object") {
                const newCartProducts = prevState.cartProducts.filter((product) => product._id != action.payload._id);
                prevState.cartProducts = newCartProducts;
                localStorage.setItem("cart", JSON.stringify(newCartProducts));
            }
        },
        increaseProductCount: (prevState, action) => {
            if (typeof prevState.cartProducts == "object") {
                const newCartProducts = prevState.cartProducts.map((product) => product._id == action.payload._id ? { ...product, count: product.count + 1 } : product);
                prevState.cartProducts = newCartProducts;
                localStorage.setItem("cart" , JSON.stringify(newCartProducts));                
            }
        },
        decreaseProductCount: (prevState, action) => {
            if (typeof prevState.cartProducts == "object") {
                const newCartProducts = prevState.cartProducts.map((product) => product._id == action.payload._id ? { ...product, count: product.count - 1 } : product);
                prevState.cartProducts = newCartProducts;   
                localStorage.setItem("cart" , JSON.stringify(newCartProducts));            
            };
              
            
        }
    } ,
extraReducers: async function (builder) {

}
})

export const {getCartProducts, AddToCart, calcTotal, calcAmount, deleteFromTheCart , increaseProductCount , decreaseProductCount } = cartSlice.actions
export default cartSlice.reducer

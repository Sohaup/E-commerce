import { productType, SubType } from "./productType";

export interface productsStateType {
    loading:boolean ,
    error:boolean ,
    cartProducts:productCartType[] | [] ,
    totalPrice:number
}

export interface productCartType {
    _id:string ,
    count:number ,
    price:number ,
   
    product:{
        _id:string ,
        quantity:number ,
        ratingAverage:number ,
        title:string ,
        brand:SubType ,
        category:SubType ,
        imageCover:string
    }
}
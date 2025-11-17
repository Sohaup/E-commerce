import { productType, SubType } from "./productType";

export interface productsStateType {
    loading:boolean ,
    error:boolean ,
    cartProducts:productCartType[] | [] | string ,
    totalPrice:number ,
    countOfProducts:number   
}

export interface productCartType {
    brand:SubType ,
    category:SubType ,
    createdAt:string ,
    description:string ,
    id:string ,
    imageCover:string ,
    images:string[] ,
    price:number ,
    quantity:number ,
    ratingsAverage:number ,
    ratingQuantity:number ,
    slug:string ,
    sold:number ,
    subcategory:SubType ,
    title:string ,
    updatedAt:string ,
    _id:string ,
    count:number
}
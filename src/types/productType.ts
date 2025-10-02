export interface productType {
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
    _id:string
}

export type SubType = {
    image:string ,
    name:string ,
    slug:string ,
    _id:string
} 


export interface CategoryType {
    createdAt:string ,
    image:string ,
    name:string ,
    slug:string ,
    updatedAt:string ,
    _id:string
} 

export type CategoryStateType = {
    error:boolean ,
    loading:boolean ,
    categories:CategoryType[] 
}
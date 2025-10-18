export interface BrandType {
    _id: string,
    name: string,
    slug: string,
    image: string,
    createdAt: string,
   updatedAt: string
}

export type BrandStateType = {
    loading:boolean ,
    error:boolean ,
    brands:BrandType[]
}


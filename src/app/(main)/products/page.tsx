import { productType } from '@/types/productType';
import React from 'react'
import Product from '@/app/_components/features/products/Product/Product';
import { getProducts } from '@/services/productApi';
import type { Metadata } from 'next';
import ProductsContainer from '@/app/_components/features/products/ProductsContainer/ProductsContainer';
import SaleSection from '@/app/_components/features/products/saleSection/SaleSection';


export const metadata:Metadata = {
  title:"Products" ,
  description:"products page of the flowCart store app"
} 

export default function page() {   
  
  return (
    <main className=' product-cont flex flex-col gap-5  '>
    <SaleSection/> 
    <ProductsContainer/>    
    </main>
  )
}

import { productType } from '@/types/productType';
import React from 'react'
import Product from '@/app/_components/features/products/Product/Product';
import { getProducts } from '@/services/productApi';
 

export default async function page() { 
  const products:productType[] = await getProducts();
  
  return (
    <section className='cont product-cont '>
     {products.map((product)=> <Product key={product._id} product={product}/>)}
    </section>
  )
}

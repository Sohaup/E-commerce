import { productType } from '@/types/productType';
import React from 'react'
import Product from '../_components/Product/Product';


 export async function getProducts() {
      const res  = await fetch("https://ecommerce.routemisr.com/api/v1/products" 
        , {method:"GET" , cache:"no-store"  }  );
     const products = await res.json();
     return products?.data ;    
  }

export default async function page() {  

  const products:productType[] = await getProducts();
  return (
    <section className='cont product-cont '>
     {products.map((product)=> <Product key={product._id} product={product}/>)}
    </section>
  )
}

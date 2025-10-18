import Product from '@/app/_components/features/products/Product/Product';
import Slider from '@/app/_components/ui/Slidder/Slider';
import { productType } from '@/types/productType';
import { Button } from 'flowbite-react';
import { Star } from 'lucide-react';
import React from 'react'
import { getRelatedProductsUsingCategory } from '@/services/productApi';

export default async function page({params}:{params:Promise<{id:string}>}) {   
   const {id} = await params;
   async function getProductDetails()  {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}` ,
         {method:"GET" , cache:"force-cache"}); 
         const productDetail =  await res.json();      
         return productDetail?.data
   }

   const productDetails:productType = await getProductDetails();  
   const relatedProducts:productType[] = await getRelatedProductsUsingCategory(productDetails.category._id);   
    
  return (
    <main >
        <section className='flex gap-10 lg:gap-6 cont py-15 items-center flex-col lg:flex-row ' >     
        <div className="slider w-1/2">
            <Slider imagesPath={productDetails.images} className='w-full lg:w-1/2'/> 
        </div>
        <div className="details flex flex-col gap-5 mx-5 lg:mx-0">
            <div className="title font-bold text-3xl">
                <h1>{productDetails.title}</h1>
            </div>
            <div className="texts flex flex-col gap-3">
                <p>
                    {productDetails.description}
                </p>
                <span className='font-bold text-terq flex gap-2'>
                    {productDetails.ratingsAverage}
                    <Star color='gold'/>
                </span>
            </div>
            <div className="btn">
                <Button className='mx-auto bg-terq/80 text-lg font-bold hover:bg-terq flex items-center  transition-all duration-700'>
                    Add to cart
                </Button>
            </div>
        </div>
        </section>   
        <section className='related-products w-full '>
            <h2 className='fw-bold text-center font-sans text-3xl'>Related Products</h2>
            <div className="cont grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-15">
                {relatedProducts.map((product)=> <Product key={product.id} product={product} className='object-contain'/>)}
            </div>
        </section>
        
    </main>
  )
}



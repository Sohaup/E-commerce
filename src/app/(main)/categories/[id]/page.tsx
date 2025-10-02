import { productType } from '@/types/productType';
import React from 'react'
import Product from '../../_components/Product/Product';


export default async function page({ params }:{params:Promise<{id:string}>}) {
    const { id } = await params;

    async function getCategoryProducts(id: string) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`);
        const categoryProducst = await res.json();
        return categoryProducst.data;
    }

    const products: productType[] = await getCategoryProducts(id);


    return (
        <section className='cont'>
            {
                products.length ?
                <div className='cont product-cont '>
                   { products.map((product) => <Product key={product._id} product={product} />)}
                 </div>
                    : <h1 className="font-bold text-4xl text-center">
                        There is no products in this category Yet
                    </h1>
            }
        </section>
    )
}

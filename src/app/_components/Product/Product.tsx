import React from 'react'
import { productType } from '../../../types/productType';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Plus, Star, View } from 'lucide-react';
import Link from 'next/link';

export default function Product({ product }: { product: productType }) {
    return (
        <Card className='hover:relative group'>
            <div className="img w-full relative group">
                <img src={product.imageCover}
                 width={300} height={300}
                 alt='prouct image'
                 className='object-cover w-full block'/>
                 <div className="wrapper bg-black/50 absolute left-0 right-0 bottom-0 h-0 overflow-hidden  group-hover:h-full  transition-all duration-500 flex flex-col gap-3 items-center justify-center">
                    <div className="icon flex-col gap-3 items-center justify-center ">
                        <View color='white' size={30} className='mx-auto'/>
                        <Link href={`/products/${product._id}`} className='text-white'>details</Link>
                    </div>
                    <div className="icon flex-col gap-3 items-center justify-center cursor-pointer">
                        <Plus color='white' size={30} className='mx-auto'/>
                        <span className='text-white'>add to cart</span>
                    </div>
                   
                 </div>
            </div>
            <CardHeader>
                <CardTitle>{product.category.name}</CardTitle>
                <CardDescription>{product.title}</CardDescription>                
            </CardHeader>           
            <CardFooter className='flex flex-col gap-3'>
                <div className="flex justify-between w-full">
                <p>{product.price} Egp</p>
                <div className="icon">
                    <Star color='gold' className={product.ratingsAverage > 4 ? "fill-yellow-300 " : "" }/>
                    <span>{product.ratingsAverage}</span>
                </div>
                </div>
                <div className="btn ">
                    <Button className='bg-terq/80 text-lg font-bold hover:bg-terq absolute bottom-0 group-hover:bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center  transition-all duration-700'>
                        Add to cart
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

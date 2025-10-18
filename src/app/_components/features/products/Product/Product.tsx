'use client'
import React, { useEffect, useRef, useState } from 'react'
import { productType } from '../../../../../types/productType';
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
import { useSelector, useDispatch } from 'react-redux'
import { postCartProducts } from "@/store/Slices/cartSlice";
import { useSession } from 'next-auth/react'
import returnToken from '@/utilities/token';
import { Session } from 'next-auth';
import { Playfair_Display } from "next/font/google";
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';


const playFairDisplayFont = Playfair_Display({
    subsets: ['cyrillic']
})



declare module "next-auth" {
    interface Session {
        token?: string;
    }
}

export default function Product({ product, className }: { product: productType, className: string }) {
    const disPatch = useDispatch<any>();
    const { data }: { data: Session | null } = useSession();
    const path = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
    const { contextSafe } = useGSAP(); 
   

    return (
        <Card className={`hover:relative group product  md:w-auto ${className}`} >
            <div className="img w-full relative group ">
                <Image src={product.imageCover}
                    width={300} height={300}
                    alt='prouct image'
                    className={`${path == "/" ? "object-cover" : "object-contain lg:object-cover"} w-full block  max-h-[400px]`} />
                <div className="wrapper bg-black/50 absolute left-0 right-0 bottom-0 h-0 overflow-hidden  group-hover:h-full  transition-all duration-500 flex flex-col gap-3 items-center justify-center">
                    <div className="icon flex-col gap-3 items-center justify-center ">
                        <View color='white' size={30} className='mx-auto' />
                        <Link href={`/products/${product._id}`} className='text-white'>details</Link>
                    </div>
                    <div className="icon flex-col gap-3 items-center justify-center cursor-pointer">
                        <Plus color='white' size={30} className='mx-auto' />
                        <span className='text-white'>add to cart</span>
                    </div>

                </div>
            </div>
            <CardHeader>
                <CardTitle className={playFairDisplayFont.className}>{product.category.name}</CardTitle>
                <CardDescription className='line-clamp-1 font-sans'>{product.title}</CardDescription>
            </CardHeader>
            <CardFooter className='flex flex-col gap-3'>
                <div className="flex justify-between w-full">
                    <p className='text-green-600'>{product.price} Egp</p>
                    <div className="icon">
                        <Star color='gold' className={product.ratingsAverage > 4 ? "fill-orange-300 " : ""} />
                        <span>{product.ratingsAverage}</span>
                    </div>
                </div>
                <div className="btn ">
                    <Button onClick={() => disPatch(postCartProducts({ productId: product._id, token: data?.token }))}
                        className={`bg-green-500 text-lg font-bold   flex items-center  transition-all duration-700 ${!data?.user ? 'bg-slate-300 ' : "hover:bg-terq "} `}
                        disabled={!data?.user}
                    >
                        Add to cart
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

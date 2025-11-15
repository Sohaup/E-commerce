'use client'
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Playfair_Display } from "next/font/google";


const playFairDisplayFont = Playfair_Display({
    subsets: ['cyrillic']
})

export type imgInfoType = {
    path: string,
    title: string,
    description: string,
    color: string
}



export default function SliderSections({ imagesPath }: { imagesPath: (imgInfoType[]) }) {
    const swiperRef = useRef<SwiperType>(null);

    useEffect(()=> {
        startAutoSliding();
    } , []);

    function startAutoSliding() {
        window.setInterval(()=> {
            swiperRef.current?.slideNext(800);
        } , 5000)
    };

    return (
        <div className='w-full space-y-3   lg:relative'>
            <Swiper
                onSwiper={(swiper) => swiperRef.current = swiper}
                loop={true}
               
            >
                {imagesPath.map((imgPath) => (

                    <SwiperSlide key={imgPath.color} >
                        <SectionProtoType imgPath={imgPath} />
                    </SwiperSlide>

                ))}

            </Swiper>

        </div>
    )
}

function SectionProtoType({ imgPath }: { imgPath: imgInfoType }) {
    return (
        <div className={`view  bg-${imgPath.color} rounded-lg w-full  flex justify-between flex-col lg:flex-row relative`}>
            <div className="texts p-3 py-10  hidden lg:flex flex-col gap-5 w-1/2 items-center justify-center ">
                <h4 className={`text-5xl xl:text-6xl  font-bold font-serif text-white  ${playFairDisplayFont.className}`}>{imgPath.title}</h4>
                <p className="font-semibold text-lg">{imgPath.description}</p>
                <Button className=" self-center  bg-black hover:bg-white transition-all text-white hover:text-black rounded-xl py-5 ">
                    <Link href={"/products"}>Shop now</Link>
                </Button>
            </div>
            <div className="img w-full  lg:w-1/2 lg:h-[450px] relative after:absolute after:inset-0 after:bg-black/40 after:hidden lg:after:block">
                <Image src={imgPath.path} alt="section image" width={200} height={200} className="w-full h-full object-cover block" />
                <div className="wrapper absolute inset-0 bg-black/40 flex lg:hidden flex-col gap-6 items-center justify-center">
                    <h4 className={`text-5xl  font-bold font-serif text-white ${playFairDisplayFont.className}`}>{imgPath.title}</h4>
                    <p className="font-semibold text-lg text-slate-200">{imgPath.description}</p>
                    <Button className=" self-center  bg-black hover:bg-white transition-all text-white hover:text-black rounded-xl py-5 ">
                        <Link href={"/products"}>Shop now</Link>
                    </Button>
                </div>
            </div>
        </div >
    )
}

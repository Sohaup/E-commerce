'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';



export default function Slider({imagesPath ,  className}:{imagesPath:(string[]) , className: string} ) {
  return (
    <div className='w-full'>
      <Swiper
     loop={true}
    >
     {imagesPath.map((imgPath)=> (
        <SwiperSlide key={imgPath} >
           <Image src={imgPath} alt='image' width={200} height={200} className={`${className} `}/>
        </SwiperSlide>
     ) )}
     
    </Swiper>
    </div>
  )
}

'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper/types';



export default function Slider({imagesPath ,  className , isHidden=false} :{imagesPath:(string[]) , className: string , isHidden:boolean} ) {

  const swiperRef = useRef<SwiperType>(null);
  function slideToIndex(index:number) {
    swiperRef.current?.slideTo(index , 500);
  }
  return (
    <div className='w-full space-y-3   lg:relative'>
      <Swiper
     onSwiper={(swiper)=> swiperRef.current = swiper} 
     loop={true}
    >
     {imagesPath.map((imgPath)=> (
        <SwiperSlide key={imgPath} >
           <Image src={imgPath} alt='image' width={200} height={200} className={`${className} `}/>
        </SwiperSlide>
     ) )}
     
    </Swiper>
    <div className="cont flex gap-1  w-full lg:w-1/2  lg:absolute left-5 " hidden={isHidden}>
     {imagesPath.map((imgPath , index)=> <Image key={imgPath}
      src={imgPath} width={200} height={200} alt='image' className={`w-1/4  `}
      onClick={()=> slideToIndex(index)}
      />)}
    </div>
    
    </div>
  ) 
}

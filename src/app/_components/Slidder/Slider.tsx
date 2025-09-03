'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


export default function Slider({imagesPath}:{imagesPath:string[]}) {
  return (
    <div className='w-full'>
      <Swiper
     loop={true}
    >
     {imagesPath.map((imgPath)=> (
        <SwiperSlide key={imgPath}>
            <img src={imgPath } width={500}/>
        </SwiperSlide>
     ) )}
     
    </Swiper>
    </div>
  )
}

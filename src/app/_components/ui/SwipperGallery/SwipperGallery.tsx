'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { SwiperSlide } from 'swiper/react'
import { Swiper } from 'swiper/react'
import type { Swiper as SwipperType } from 'swiper/types'

export default function SwipperGallery({ imagePathsArr }: { imagePathsArr: string[] }) {
    const SwiperRef = useRef<SwipperType>(null);
    useEffect(()=> {
        startAutoSliding();
    } , [])
    function slideNext() {
        SwiperRef.current?.slideNext();
    }
    function slidePrev() {
        SwiperRef.current?.slidePrev();
    }
    function startAutoSliding() {
       window.setInterval(()=> {
           SwiperRef.current?.slideNext(); 
       } , 2000)
    }

    return (
        <div className="contol flex  gap-5 items-center ">
            <div className="triggers xl:flex gap-5 hidden ">
                <span onClick={slidePrev} className='w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center'><ArrowLeft /></span>
            </div>

            <div className=" min-w-[100%]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 xl:hidden cont   overflow-hidden ">
                {imagePathsArr.map((info) => <TestmonailCard key={info} imgPath={info} className='w-[90%] md:w-full mx-auto' />)}
            </div>

            <Swiper slidesPerView={5} pagination={{ clickable: true }} loop spaceBetween={30} onSwiper={(swiper)=> SwiperRef.current = swiper} >
                {imagePathsArr.map((info) => <SwiperSlide key={info} ><TestmonailCard imgPath={info} className='hidden xl:block' /></SwiperSlide>)}
            </Swiper>

            <div className="triggers xl:flex gap-5 hidden ">
                <span onClick={slideNext} className='w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center'><ArrowRight /></span>
            </div>
        </div>
    )
}

function TestmonailCard({ imgPath, className }: { imgPath: string, className?: string }) {
    return (
        <div className={` rounded-xl  xl:flex-shrink-0 card  ${className}`}>
            <div className='bg-green-200 w-full h-full  xl:flex-shrink-0 rounded-xl py-4  relative after:absolute after:inset-0 after:bg-black/30 after:rounded-xl ' >
                <Image src={imgPath} alt="store image description" width={200} height={200} className='w-full object-cover h-full' />
            </div>
        </div>
    )
}



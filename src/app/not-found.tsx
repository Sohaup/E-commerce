'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import notFoundImg from "@/../public/images/not-found/404.png"
import { Arima } from 'next/font/google'
import "./globals.css"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

const arimaFont = Arima({
  subsets: ['greek']
})


export default function NotFound() {
  const spanRef = useRef<HTMLSpanElement>(null);
  gsap.registerPlugin(SplitText)
  useGSAP(()=>{
   SplitText.create(spanRef.current , {
    type:"lines,words,chars" ,
    autoSplit:true ,
    onSplit:(self)=> {
      gsap.from(self.chars , {
        opacity:0 ,
        x:50 ,
        stagger:.5 ,
        duration:1 ,
        onComplete:()=>self.revert()
      })
    }
   })
  } , {scope:spanRef})
  return (
    <main className='flex flex-col bg-green-100 min-h-screen lg:max-h-screen min-w-screen overflow-hidden   '>
      <div className="cont flex flex-col-reverse lg:flex-row  h-full  py-5 lg:py-0 ">
        <div className=" w-full md:w-3/4 lg:w-1/2  lg:block  mt-15 md:mt-7 lg:mt-0 self-center">
          <Image src={notFoundImg} alt='not found cool img' className='w-full block object-cover' />
        </div>
        <div className="texts w-full lg:w-1/2 self-center flex flex-col gap-3 items-center  ">
          <h1 className={`font-bold ${arimaFont.className} flex flex-col items-center gap-3 text-5xl lg:text-6xl xl:text-7xl uppercase`}>
            Oh no , Error
            <span ref={spanRef} className='text-red-500'>404</span>
          </h1>
          <p className='text-slate-700 text-md capitalize'>
            the page you currently tring to access is not axists
          </p>
          <Button className='bg-green-500 py-6 px-2 hover:bg-green-900 font-semibold '>
            <Link href={"/"}>Return to the home page</Link>
          </Button>
        </div>
      </div>
      <div className="svg w-full block mt-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fillOpacity={1} d="M0,32L24,64C48,96,96,160,144,197.3C192,235,240,245,288,208C336,171,384,85,432,74.7C480,64,528,128,576,181.3C624,235,672,277,720,261.3C768,245,816,171,864,117.3C912,64,960,32,1008,48C1056,64,1104,128,1152,170.7C1200,213,1248,235,1296,208C1344,181,1392,107,1416,69.3L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z" />
        </svg>
      </div>
    </main>
  )
}

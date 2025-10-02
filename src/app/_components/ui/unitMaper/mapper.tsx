'use client'
import { Playfair_Display } from "next/font/google";
import Image from 'next/image'
import React from 'react'

export interface imgInfoType {
    description:string ,
    src:string ,
    texts:string
}

const playFairFont = Playfair_Display({
  subsets:["cyrillic"]
})

export default function Mapper({imgs , className}:{imgs:imgInfoType[] , className:string}) {
  return (
    <div className={`${className}`}>
      {imgs.map((img)=> (
        <UnitStructure key={img.description} img={img}/>
      ))}
    </div>
  )
}

function UnitStructure({img}:{img:imgInfoType}) {
    return (
        <div className="wrapper flex  gap-2 items-center ">
        <span className='bg-white w-20 h-20 rounded-full flex items-center justify-center'>
            <Image src={img.src} alt={img.description} className='w-full block object-fill rounded-full' width={200} height={200}/>
        </span>
        <div className="details ">
            <h2 className={`text-lg text-white font-bold ${playFairFont.className} `}>{img.description}</h2>
            <p className=" text-black font-sans capitalize"> {img.texts}</p>
        </div>
        </div >
    ) 
}

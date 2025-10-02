'use client'
import { CategoryType } from '@/types/categoryType'
import React from 'react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'

const playFairDisplayFont = Playfair_Display({
  subsets:["cyrillic"]
})

export default function CategotyCard({category}:{category:CategoryType}) {
  return (
    <div className='flex flex-row-reverse justify-between  bg-slate-200 rounded-xl h-[150px] hover:bg-slate-300 hover:-translate-y-3 transition-all duration-700  '>
      <div className="img">
        <Image src={category.image} alt={category.name} width={200} height={200}  className='w-1/2 h-full object-cover ms-auto rounded-xl'/>
      </div>
      <div className="title self-center ">
        <h3 className={`text-xl font-bold px-5 ${playFairDisplayFont.className}` }>{category.name}</h3>
      </div>
    </div>
  )
}

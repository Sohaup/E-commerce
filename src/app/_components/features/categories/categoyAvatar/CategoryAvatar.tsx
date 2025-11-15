'use client'
import { CategoryType } from '@/types/categoryType'
import Image from 'next/image'
import React, { useState } from 'react'
import { Playfair_Display } from 'next/font/google'

const playFairDisplayFont = Playfair_Display({
  subsets:["cyrillic"]
})

export default function CategoryAvatar({category}:{category:CategoryType}) {
    const [hidden , setHidden] = useState(false);
  return (
    <div className=' h-12 flex flex-col items-center justify-center' hidden={hidden}>
       <span className='w-15 h-15 rounded-full block'>
        <Image onError={()=>setHidden(true)} src={category.image} alt={category.slug} width={200} height={200} className='w-full h-full rounded-full object-contain'/>
       </span>
       <div className={`${playFairDisplayFont.className} text-white font-bold`}>
        <h2>{category.name}</h2>
       </div>
    </div>
  )
}

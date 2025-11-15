import React from 'react'
import storeImg from "@/../public/images/home/shop.jpg"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StoreSection() {
  return (
      <main className='bg-slate-200 pt-15 md:py-15 '>
        <div className="main cont flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between">
          <div className="texts flex flex-col items-center justify-center gap-4">
            <h2 className='font-sans text-6xl font-bold '>Trusted Store</h2>
            <p className='text-sans text-md capitalize text-center '>
              we had a trusted store among thousands of our honest customers
            </p>
            <Button className=' px-5 hover:text-emerald-300 '>
              <Link href="/products" className='transition-all duration-500'>start Shopping</Link>
            </Button>
          </div>
          <div className="img  lg:after:rounded-xl w-full lg:w-1/2 relative after:absolute after:bg-black/50 after:inset-0 after:z-10">
            <Image src={storeImg} alt="store image" width={200} height={200} className='w-full lg:rounded-xl object-cover '/>
            
          </div>
        </div>
      </main>
  )
}

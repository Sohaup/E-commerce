import React from 'react'
import { Button } from '@/components/ui/button';
import { Playfair_Display } from 'next/font/google';

const playFairDisplayFont = Playfair_Display({
  subsets:['latin']
})

export default function SaleSection() {
  return (
    <section className="sale bg-image w-full   flex justify-center items-center ">
        <div className="img bg-green-100/80 rounded-lg flex flex-col gap-3 items-center justify-center my-10 w-full lg:w-1/2 min-h-[500px]  ">
          <div className="title self-center text-center">
            <h1 className={`text-4xl font-bold ${playFairDisplayFont.className} ` }> Get 35% off on our latest Products</h1>
          </div>
          <Button className='font-bold font-sans p-5 hover:bg-green-700'>Buy now</Button>
        </div>   
          
      </section>
  )
}

'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from "@/store/store";
import { useSession } from 'next-auth/react';
import returnToken from '@/utilities/token';
import CartProduct from '@/app/_components/features/products/CartProduct/CartProduct';
import { Session } from 'next-auth';
import { calcAmount, calcTotal } from '@/store/Slices/cartSlice';

declare module "next-auth" {
  interface Session {
    token?: string;
  }
}

export default function Page() {
  const store = useSelector((store: StoreType) => store.cartReducer);
  const dispatch = useDispatch<any>();
  const { data }: { data: Session | null } = useSession();
  useEffect(()=> {
    dispatch(calcTotal());
    dispatch(calcAmount());
  } , [])
  
  return (
    <div className='cont flex flex-col items-center gap-8 py-15'>
      <h1 className='text-6xl font-bold font-sans py-5 '>Shopping Cart</h1>
      <div className="main flex  w-full flex-col  ">
        <div className="products cont  grid grid-cols-1 md:grid-cols-2 gap-10  ">
          {
            typeof store.cartProducts == "object" ?
              store.cartProducts.map((product) => <CartProduct product={{...product}} key={product.id} />)
              : ""
          }
        </div>
        <div className="summary   w-full  lg:w-1/2 mx-auto mt-10">
         <OrderSummary amountOfProducts={store.countOfProducts} totalPrice={store.totalPrice}/>
        </div>
      </div>

    </div>
  )

}

function OrderSummary({amountOfProducts , totalPrice}:{amountOfProducts:number , totalPrice:number}) {
  return (
    <div className="summary border-1 border-black ">
      <div className="title border-5 border-black p-2">
        <h2 className='text-3xl font-bold text-center'>Summary</h2>
      </div>

      <div className="text  text-lg">
        <p className='flex justify-between p-2'>
          <span>items Count :</span>
          <span>{amountOfProducts}</span>
        </p>
         <p className='flex justify-between text-lg p-2'>
          <span>totalPrice :</span>
          <span>{totalPrice}</span>
        </p>
         <p className=' text-xl border-t-3 border-black py-2 text-center text-red-600 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-500'>
          CheckOut
        </p>
      </div>
    </div>
  )
}





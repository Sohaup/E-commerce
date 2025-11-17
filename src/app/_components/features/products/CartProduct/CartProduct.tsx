import { productCartType } from '@/types/cartTypes'
import Image from 'next/image'
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { productType } from '@/types/productType';
import { Minus, Plus } from 'lucide-react';
import { Button } from 'flowbite-react';
import { calcAmount, deleteFromTheCart, calcTotal, decreaseProductCount, increaseProductCount } from '@/store/Slices/cartSlice';

export default function CartProduct({ product }: { product: productCartType }) {
  const dispatch = useDispatch<any>();
  const session = useSession();  
  
  function deleteProduct() {
    try {
      dispatch(deleteFromTheCart(product));
      dispatch(calcAmount());
      dispatch(calcTotal());
      toast.success("deleted from the cart successfuly");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  function decreaseProductCountUi() {
    try {
      if (product.count - 1 <= 0) {
        deleteProduct();
      }
      dispatch(decreaseProductCount(product));
      dispatch(calcAmount());
      dispatch(calcTotal());     

    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  function increaseProductCountUi() {
    try {     
      dispatch(increaseProductCount(product));
      dispatch(calcAmount());
      dispatch(calcTotal());     

    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }


  return (
    <div className='flex justify-between flex-col '>
      <div className="card-texts pt-10 flex-col gap-3 w-full ">
        <h2 className='text-3xl font-sans font-bold'>{product.description}</h2>
        <p className='text-lg text-slate-400 flex flex-col '>
          {product.title}
          <span className='text-black text-md '>{product.price} Egp</span>
        </p>
        <div className="counter flex justify-center my-2 ">
          <p className='text-black font-semibold text-lg flex gap-3'>
            <span className='text-2xl' onClick={decreaseProductCountUi}><Minus /></span>
            <span className='text-green-400'>{product.count}</span>
            <span className='text-2xl' onClick={increaseProductCountUi}><Plus /></span>
          </p>
        </div>
      </div>
      <div className="card-img w-full xl:w-3/4 ">
        <Image src={product.imageCover} alt={product.title} width={300} height={300} className='w-full object-cover' />
      </div>
      <div className="btn flex justify-center xl:w-3/4 my-4">
        <Button className='bg-red-500 hover:bg-red-700 transition-colors duration-500' onClick={deleteProduct}>
          Delete
        </Button>
      </div>
    </div>
  )
}

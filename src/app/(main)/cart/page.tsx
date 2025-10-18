'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from "@/store/store";
import { getCartProducts } from '@/store/Slices/cartSlice';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import returnToken from '@/utilities/token';
import CartProduct from '@/app/_components/features/products/CartProduct/CartProduct';

declare module "next-auth" {
  interface Session {
    token?: string;
  }
}

export default function Page() {
  const store = useSelector((store: StoreType) => store.cartReducer);
  const dispatch = useDispatch<any>();
  const { data }: { data: Session | null } = useSession();
 
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await returnToken();
        

        // Use token from session if available, otherwise fallback
        const finalToken = data?.token ;
        
        if (finalToken) {
          await dispatch(getCartProducts({ token: finalToken }));        
        } else {
          
        }
      } catch (error ) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCart();  

    
  }, [data]); 

  return (
    <div className='cont flex flex-col items-center gap-8'>
      <h1 className='text-3xl font-bold'>all cart products</h1>
     {store.cartProducts.map((product)=> <CartProduct product={product}  key={product._id}/>)}
    </div>
  )

}

  
  
  

'use client'
import { Button } from '@/components/ui/button'
import { AddToCart, calcAmount, calcTotal, increaseProductCount } from '@/store/Slices/cartSlice';
import { StoreType } from '@/store/store';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productType } from '../../../../types/productType';
import { toast } from 'sonner';

export default function CartButton({product}:{product:productType}) {
    const disPatch = useDispatch<any>();
    const cartData = useSelector((store: StoreType) => store.cartReducer);
    const { data }: { data: Session | null } = useSession();
     const navigate = useRouter();
    function AddTheProductToTheCart() {
        if (typeof cartData.cartProducts == "object") {
            if (data?.user) {
                const isProductAlreadyExists = cartData.cartProducts.some((cartProduct) => cartProduct._id == product._id);
                if (isProductAlreadyExists) {
                    disPatch(increaseProductCount(product));
                    toast.success("Added To The Cart Successfuly");
                } else {
                    disPatch(AddToCart({ ...product, count: 1 }));
                    toast.success("Added To The Cart Successfuly");
                }
            } else {
                navigate.push("/login");
            }
        }
        disPatch(calcAmount());
        disPatch(calcTotal());
    }
    return (
        <Button onClick={AddTheProductToTheCart} className='mx-auto bg-terq/80 text-lg font-bold hover:bg-terq flex items-center  transition-all duration-700'>
            Add to cart
        </Button>
    )
}

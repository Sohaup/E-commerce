'use client'
import React, { useEffect, useRef, useState } from 'react'
import { getCategories } from '@/services/productApi'
import { CategoryType } from '@/types/categoryType';
import Loader from '../Loader/Loader';
import Image from 'next/image';
import { UseSelector  , useDispatch, useSelector} from 'react-redux';
import { StoreType } from '@/store/store';
import { filterByCategory } from '@/store/Slices/productSlice';


export default function CategoriesMenu() {
    const [categories , setCategories] = useState<CategoryType[] | null>(null);
    const menuRef = useRef<HTMLDivElement>(null)
    const [isHiden , setIsHidden] = useState(true)
    const productState = useSelector((store:StoreType)=> store.produtsReducer);
    const dispatch = useDispatch();

    useEffect(()=> {
       getCategories().then((data)=> {
        console.log(data);
        setCategories(data);
       })  
       
      window.addEventListener("scroll" , ()=>{
      menuRef.current?.classList.add("hidden")
    })

     window.addEventListener("scrollend" , ()=>{
      menuRef.current?.classList.remove("hidden")
    })
       
    } , [])
  return ( 
    <div className='bg-black w-full   text-white absolute -bottom-[135px] md:-bottom-[50px] xl:-bottom-[60px] ' ref={menuRef}>
        {categories ? 
        <ul className='grid grid-cols-3 md:flex    gap-2 lg:gap-4  justify-center py-4'>
            {categories.map((category)=> ( 
                <li key={category._id} className='flex gap-1 items-center bg-red-500' onClick={()=> dispatch(filterByCategory(category.name))}>
                    <span className='w-fit h-fit'>{category.name}</span>
                    <Image src={category.image} alt={category.name} width={200} height={200} className='w-10 h-10 rounded-lg hidden xl:block'/>
                </li>
            ))}
        </ul> : 
        <div className="loader w-full flex justify-center items-center">
            <Loader/>
        </div>
        }
    </div>
  )
}

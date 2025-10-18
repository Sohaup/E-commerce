'use client'
import { StoreType } from '@/store/store'
import React, { useEffect, useRef } from 'react'
import { UseSelector , useDispatch, useSelector } from 'react-redux'
import { getProductData  } from '@/store/Slices/productSlice'
import Loader from '@/app/_components/ui/Loader/Loader'
import Product from '../Product/Product'
import SearchForm from '../SearchForm/SearchForm'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ProductsContainer() {
    const productState = useSelector((store:StoreType)=> store.produtsReducer);
    const dispatch = useDispatch<any>(); 
    const containerRef = useRef<HTMLDivElement>(null);    
    gsap.registerPlugin(ScrollTrigger)
    useEffect(()=> {
        dispatch(getProductData());    
           
    } , []);
    useGSAP(()=> {
        const productCards = containerRef.current;
        console.log(productCards);
        
        gsap.from(productCards! , {
            opacity:0 ,
            y:100 ,
            duration:5 ,
            stagger:{
                each:1
            }
        })   
    } , {scope:containerRef})
  return (
    <div>
        {
        productState.loading ? 
        <div className="loader fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <Loader/>
        </div> :
        <section className="products cont py-15">
            <SearchForm className='w-3/4 lg:w-1/2 '/>
            <h2 className='my-5 font-bold font-sans text-center text-4xl'>Our Products</h2>
            <div ref={containerRef} className="grid gap-3 grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-10">
                { productState.filteredProducts.map((product)=> <Product key={product._id} product={product} className=''/>)}
            </div>
        </section>
       

        }
    </div>
  )
}

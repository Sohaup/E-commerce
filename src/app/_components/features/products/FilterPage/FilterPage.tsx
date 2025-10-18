'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Flip } from 'gsap/Flip'
import { Observer } from 'gsap/Observer'
import { X } from 'lucide-react'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import { StoreType } from '@/store/store'
import Loader from '@/app/_components/ui/Loader/Loader'
import { getBrandsData } from '@/store/Slices/brandSlice'
import { getCategories } from '@/services/categoryApi'
import { getCategoriesData } from '@/store/Slices/categorySlice'
import { Button } from '@/components/ui/button'
import { filterByCategory, filterByBrand, clearTheFilter } from '@/store/Slices/productSlice'
import { toast } from "sonner"

export default function FilterPage({ isToggle, setIsToggle, containerRef }: { isToggle: boolean, setIsToggle: Function, containerRef: React.RefObject<HTMLDivElement | null> }) {
    // const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const spanContainerRef = useRef<HTMLDivElement>(null);
    const barndState = useSelector((store: StoreType) => store.brandSlice);
    const categoryState = useSelector((store: StoreType) => store.categorySlice);
    const dispatch = useDispatch<any>();
    gsap.registerPlugin(Flip, Observer);
    const { contextSafe } = useGSAP({ scope: containerRef });
    useEffect(() => {
        dispatch(getBrandsData());
        dispatch(getCategoriesData());

    }, []);

    const toggleVisibilty = () => {
        setIsToggle(false)
    };

    function applyFilter(categoryName?: string, brandName?: string) {
        const targetSpans = containerRef.current?.querySelectorAll("span");
        if (targetSpans) {
            targetSpans.forEach((span) => {
                span.addEventListener("click", (e) => {
                    span.classList.toggle("bg-green-400");
                    try {
                        if (categoryName) {
                            dispatch(filterByCategory(categoryName));
                        } else {
                            dispatch(filterByBrand(brandName));
                        }
                        toast.success("filtered successfuly")
                    } catch (err) {
                        if (err instanceof Error) {
                            toast.error(err.message)
                        }
                    }

                })

            })
        }

    }

    function clearTheFilterOnUI() {
        try {
            const targetSpans = containerRef.current?.querySelectorAll("span");
            dispatch(clearTheFilter());
            targetSpans?.forEach((span) => {
                span.classList.remove("bg-green-400");
            })
            toast.success("cleared the filter successfuly");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    }

    return (
        <div className={`  ${isToggle ? "w-[98%] opacity-100" : "w-0 opacity-0"} fixed inset-0 right-2 overflow-y-auto  bg-white  flex-col z-50 transition-all duration-700`} ref={containerRef}>
            <div className="close bg-red-500 text-white flex items-center justify-center self-end p-3 rounded-md absolute top-5 right-5" ref={iconRef} onClick={toggleVisibilty}>
                <X />
            </div>
            <div className="brands flex flex-col gap-3 items-start cont my-5 mx-auto p-6">
                <h2 className='font-bold font-sans'>Brands</h2>
                <div className="main grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10  gap-3  ">
                    {
                        barndState.brands.map((brand) => <span onClick={() => applyFilter(undefined, brand.name)} className='outline-1 outline-slate-300 p-3 rounded-lg flex items-center justify-center transition-colors' key={brand._id}>{brand.name}</span>)
                    }
                </div>
            </div>

            <div className="categories flex flex-col gap-3 items-start cont my-5 mx-auto p-5">
                <h2 className='font-bold font-sans'>Categories</h2>
                <div className="main grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10  gap-3  ">
                    {
                        categoryState.categories.map((category) => <span onClick={() => applyFilter(category.name)} className='outline-1 outline-slate-300 p-3 rounded-lg flex items-center justify-center transition-colors' key={category._id}>{category.name}</span>)
                    }
                </div>
            </div>
            <div className="btns-group flex justify-center items-center gap-3 mt-auto mb-5 ">
                <Button className='bg-transparent border-1 border-green-400 rounded-lg text-green-400 py-5 px-8 font-bold hover:bg-green-400 hover:text-white' onClick={clearTheFilterOnUI}>Clear</Button>
                <Button className='bg-green-400 border-1 border-green-400 rounded-lg  py-5 px-8 font-bold hover:bg-green-600 '>Apply</Button>
            </div>
        </div>
    )
}

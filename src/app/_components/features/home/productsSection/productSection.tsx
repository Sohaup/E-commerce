'use client'
import { CategoryType } from '@/types/categoryType'
import { productType } from '@/types/productType'
import React, { useRef } from 'react'
import Product from '../../products/Product/Product'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ProductSection({ products, categories }: { products: productType[], categories: CategoryType[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add({ isDesktop: "(min-width:1500px)", isMobile: "(max-width:1499px)" }, (context) => {
            const sections = containerRef.current?.querySelectorAll(".section:not(.hidden)");
            if (context?.conditions?.isDesktop) {
                const translateXFullTwean = gsap.to(containerRef?.current, {
                    xPercent: 20 * (sections ? sections.length * -1 : 0)

                })
                ScrollTrigger.create({
                    animation: translateXFullTwean,
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 2,
                    anticipatePin: 1
                });

                if (sections) {
                    sections.forEach((section, index) => {
                        if (index) {
                            gsap.from(section, {
                                opacity: 0,
                                y: 200,
                                stagger: .1,
                                scrollTrigger: {
                                    trigger: section,
                                    containerAnimation: translateXFullTwean,
                                    scrub: true
                                }
                            })
                        }
                    })
                }
                return () => {
                    translateXFullTwean.kill();
                }

            } 



        })

        return () => {
            mm.revert();
        }


    }, {
        scope: containerRef
    })
    return (
        <section className='bg-slate-100 overflow-hidden py-15 '>
            <div className="title text-center">
                <h2 className='font-sans text-4xl font-bold  py-5'>Our most loved Products</h2>
                <p className='text-gray-800 text-md font-sans'>tried weared and trusted by thousands of our customers</p>
            </div>
            <div className="main flex cont flex-wrap 2xl:w-[1800%] gap-20" ref={containerRef}>
                {categories.map((category) => <CategoryProducts key={category._id} category={category} products={products} />)}
            </div>
        </section>
    )
}


function CategoryProducts({ category, products }: { category: CategoryType, products: productType[] }) {    
    const filteredProducts: productType[] = products.filter((product) => product.category._id == category._id);
   
    return (
        <div className={` ${filteredProducts.length ? "w-fit " : "hidden"} section flex flex-col 2xl:flex-row gap-3 items-center `}>
            <div className="title">
                <h3 className='font-bold text-xl text-green-400 font-sans'>{filteredProducts.length ? category.name : ""}</h3>

            </div>
            <div className={`products flex flex-wrap  gap-3 justify-center ${filteredProducts.length ? "2xl:w-[600%] 2xl:mt-25  " : "hidden"}`}>
                {filteredProducts.length ?
                    filteredProducts.map((product) => <Product key={product._id} product={product} className='w-[85%]'/>)
                    : ""
                }
            </div>
        </div>
    )
}
'use client'
import landingImg from "@/../public/images/home/green_juice.png"
import lemonImg from "@/../public/images/home/lemons.png"
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import peachImg from "@/../public/images/home/peach.jpg";
import chocoImg from "@/../public/images/home/choco.jpg";
import saladImg from "@/../public/images/home/salad.jpg";
import Mapper, { imgInfoType } from "../../../ui/unitMaper/mapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LandingSection() {
    const imgsInfo: imgInfoType[] = [
        {
            description: "fresh peach ",
            src: peachImg.src,
            texts: "we had a lot of fresh fruits like this peach"
        },
        {
            description: "swaet chocolate bar",
            src: chocoImg.src,
            texts: "60% cacao for deep smooth favor  "
        },
        {
            description: "healthy salad",
            src: saladImg.src,
            texts: "Non Gmo , Vagen Friendly and carfeted clean "
        }

    ]
    const animationContainerRef = useRef<HTMLDivElement>(null);
    const animationHeaderRef = useRef<HTMLHeadingElement>(null);
    const animationPargarphRef = useRef<HTMLParagraphElement>(null)
    const animationBtnGruopRef = useRef<HTMLDivElement>(null)
    const landingImgRef = useRef<HTMLDivElement>(null)
    const lemoanImgRef = useRef<HTMLDivElement>(null)
    const freshProductsRef = useRef<HTMLDivElement>(null)
    gsap.registerPlugin(ScrollTrigger );
    useGSAP(() => {
        const tl = gsap.timeline();
        const mm = gsap.matchMedia();        

        tl.from(animationHeaderRef?.current, {
            scale: 2,
            opacity: 0,
            duration: 2
        }, .1);


        tl.from(lemoanImgRef?.current, {
            opacity: 0,
            scale: 1.5,
            duration: 2
        }, .1);

        tl.from(animationPargarphRef?.current, {
            opacity: 0,
            duration: 1,
            x: 100
        });

        tl.from(animationBtnGruopRef?.current, {
            opacity: 0,
            y: 100
        });

        tl.from(landingImgRef?.current, {
            opacity: 0,
            scale: 1.5,
            duration: 2
        }, .1);

        const freshProductsTl = tl.from(freshProductsRef?.current, {
            xPercent: -100,
            duration: 2,
            ease: "bounce.out",

        })


        tl.to(animationBtnGruopRef?.current, {
            y: 10,
            repeat: -1,
            yoyo: true,
            ease: "elastic.in",
            duration: 1,
            delay:1
        });

        mm.add({
            isMobile: "(max-width:1000px)",
            isDesktop: "(min-width:1001px)"
        }, (context) => {
            if (context.conditions?.isDesktop) {

                return () => {
                    freshProductsTl.kill();
                }

            } else if (context.conditions?.isMobile) {

                const lemonTl = gsap.to(landingImgRef?.current, {
                    xPercent: -100,

                    scrollTrigger: {
                        trigger: landingImgRef?.current,
                        start: "top top",
                        end: "+=500",
                        scrub: true,
                        pin: true,
                        pinSpacing: true,

                    }
                });

                const freshTl = gsap.to(freshProductsRef?.current, {
                    overwrite:true ,
                    xPercent: 0,
                    duration: 2,
                    ease: "bounce.out",
                    scrollTrigger: {
                        trigger: landingImgRef?.current,
                        start: "top center",

                    }
                }
                )

                return () => {
                    lemonTl.kill();
                    freshTl.kill();
                }

            }
        })



        return () => {
            tl.kill();
            mm.revert();
        }


    }, { scope: animationContainerRef })
    return (
        <section className="flex  flex-col justify-center bg-slate-100">
            <div className="flex  flex-col justify-center  lg:flex-row  lg:justify-evenly cont">
                <div ref={animationContainerRef} className="landing-details my-20 flex flex-col justify-center items-center lg:items-stretch ">
                    <h1 className="font-serif font-bold text-6xl my-3 w-full md:w-3/4 text-center lg:text-start " ref={animationHeaderRef}>Our customers Most loved Store</h1>
                    <p className="font-light text-slate-500 font-sans my-3 w-3/4 text-center lg:text-start " ref={animationPargarphRef}>
                        Tried and approved by Thousand of customers who value high quality
                        and fast shipping along with daily customers service
                    </p>
                    <div className="btn-group my-5 flex gap-5  " ref={animationBtnGruopRef}>
                        <Button className="bg-green-400 rounded-xl text-white font-bold flex gap-3 items-center py-6 hover:bg-green-600">
                            <span className="w-8 h-8 rounded-full bg-white text-green-400 flex justify-center items-center "><ShoppingBag /></span>
                            Online Shop
                        </Button>
                        <Button className="bg-transparent hover:bg-transparent shadow-none text-black font-semibold font-sans flex items-center py-6 hover:text-green-500 hover:translate-x-1 duration-500 ">
                            Get Info
                            <ArrowRight />
                        </Button>
                    </div>
                    <div className="landing-details-img flex  justify-start w-1/2  " ref={lemoanImgRef}>
                        <Image src={lemonImg} alt="green and fresh lemons" className="w-full lg:w-3/4 block drop-shadow-xl" />
                      
                    </div>
                </div>

                <div className="landing-img flex flex-col   translate-x-full lg:translate-x-0   z-20 my-auto " ref={landingImgRef}>
                    <Image src={landingImg} alt="green juice img" className="w-1/2 z-0 lg:w-3/4 block object-cover mx-auto  img-shake drop-shadow-2xl" />
                </div>


            </div>
            <div ref={freshProductsRef} className="fresh-products   bg-green-400 translate-y-40  lg:-translate-y-0 py-10 lg:px-5 z-30   ">
                <Mapper imgs={imgsInfo} className="flex flex-col lg:flex-row gap-8 lg:justify-center " />
            </div>
        </section>
    )
}



'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Observer } from 'gsap/Observer';
import Image from 'next/image';
import testmaonialImg1 from "@/../public/images/home/woemn1Avatar.jpg"
import testmaonialImg2 from "@/../public/images/home/woemn2Avatar.jpg"
import testmaonialImg3 from "@/../public/images/home/manAvatar.jpg"


// Define the config type
interface HorizontalLoopConfig {
    repeat?: number;
    paused?: boolean;
    speed?: number;
    snap?: number | false | ((value: number) => number); // remove `true`
    paddingRight?: number;
    reversed?: boolean;
}


// Main function
function horizontalLoop(
    items: HTMLElement[] | NodeListOf<HTMLElement> | NodeListOf<Element> | string,
    config: HorizontalLoopConfig = {}
): gsap.core.Timeline & {
    next: (vars?: gsap.TweenVars) => gsap.core.Tween;
    previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
    current: () => number;
    toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
    times: number[];
} {
    const elements: HTMLElement[] = gsap.utils.toArray(items) as HTMLElement[];
    const tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => {
            tl.totalTime(tl.rawTime() + tl.duration() * 100);
        },

    });

    const length = elements.length;
    const startX = elements[0]?.offsetLeft;

    const times: number[] = [];
    const widths: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;

    const pixelsPerSecond = (config.speed || 1) * 100;
    let snap: (value: number) => number;

    if (config.snap === false) {
        snap = (v) => v; // identity function, no snapping
    } else if (typeof config.snap === "function") {
        snap = config.snap;
    } else {
        // When config.snap is a number (or true), default to 1 or the value
        snap = gsap.utils.snap(typeof config.snap === "number" ? config.snap : 1);
    }


    let totalWidth: number;

    gsap.set(elements, {
        xPercent: (i, el) => {
            const width = (widths[i] = parseFloat(
                gsap.getProperty(el, "width", "px") as string
            ));
            xPercents[i] = snap(
                ((parseFloat(gsap.getProperty(el, "x", "px") as string) / width) * 100) +
                (gsap.getProperty(el, "xPercent") as number)
            );
            return xPercents[i];
        },
    });

    gsap.set(elements, { x: 0 });

    totalWidth =
        elements[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        elements[length - 1].offsetWidth *
        (gsap.getProperty(elements[length - 1], "scaleX") as number) +
        (config.paddingRight || 0);

    for (let i = 0; i < length; i++) {
        const item = elements[i];
        const curX = (xPercents[i] / 100) * widths[i];
        const distanceToStart = item.offsetLeft + curX - startX;
        const distanceToLoop =
            distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

        tl.to(
            item,
            {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond,
            },
            0
        )
            .fromTo(
                item,
                {
                    xPercent: snap(
                        ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                    ),
                },
                {
                    xPercent: xPercents[i],
                    duration:
                        (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                    immediateRender: false,
                },
                distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);

        times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index: number, vars: gsap.TweenVars = {}): gsap.core.Tween {
        if (Math.abs(index - curIndex) > length / 2) {
            index += index > curIndex ? -length : length; // shortest direction
        }

        const newIndex = gsap.utils.wrap(0, length, index);
        let time = times[newIndex];

        if ((time > tl.time()) !== (index > curIndex)) {
            vars.modifiers = {
                time: gsap.utils.wrap(0, tl.duration()),
            };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }

        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }

    // Attach navigation methods
    (tl as any).next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
    (tl as any).previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
    (tl as any).current = () => curIndex;
    (tl as any).toIndex = (index: number, vars?: gsap.TweenVars) =>
        toIndex(index, vars);
    (tl as any).times = times;

    tl.progress(1, true).progress(0, true); // pre-render

    if (config.reversed) {
        tl.vars.onReverseComplete?.();
        tl.reverse();
    }

    return tl as typeof tl & {
        next: (vars?: gsap.TweenVars) => gsap.core.Tween;
        previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
        current: () => number;
        toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
        times: number[];
    };
}

export default function Testmonial() {
    const containerRef = useRef<HTMLDivElement>(null);
    const testmonialCardRef = useRef<HTMLDivElement>(null)
    const spanNextRef = useRef<HTMLSpanElement>(null)
    const spanPrevRef = useRef<HTMLSpanElement>(null)
    gsap.registerPlugin(Observer);
    useGSAP(() => {

        const mm = gsap.matchMedia();
        mm.add("(min-width:1280px)", () => {
            const loop = horizontalLoop(containerRef.current?.querySelectorAll(".card")!, { paused: true })
            Observer.create({
                target: spanPrevRef.current,
                onClick: () => {
                    loop.previous({ duration: 1 })
                }
            })
            Observer.create({
                target: spanNextRef.current,
                onClick: () => {
                    loop.next({ duration: 1 })
                }
            })
        })

        return ()=>{
            mm.revert();
        }

    }, { scope: containerRef })

    const cardInfoesArr: CardInfoType[] = [
        {
            id: 1,
            title: "Anderea Weliem ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg1.src,
            date: "21 july, 2025"
        },
        {
            id: 2,
            title: "sofee smith",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg2.src,
            date: "15 july, 2021"
        },
        {
            id: 3,
            title: "mark ciel ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg3.src,
            date: "17 octoper, 2024"
        },
        {
            id: 4,
            title: "Anderea Weliem ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg1.src,
            date: "21 july, 2025"
        },
        {
            id: 5,
            title: "sofee smith",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg2.src,
            date: "15 july, 2021"
        },
        {
            id: 6,
            title: "mark ciel ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg3.src,
            date: "17 octoper, 2024"
        },
        {
            id: 7,
            title: "Anderea Weliem ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg1.src,
            date: "21 july, 2025"
        },
        {
            id: 8,
            title: "sofee smith",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg2.src,
            date: "15 july, 2021"
        },
        {
            id: 9,
            title: "mark ciel ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg3.src,
            date: "17 octoper, 2024"
        },
        {
            id: 10,
            title: "Anderea Weliem ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg1.src,
            date: "21 july, 2025"
        },
        {
            id: 11,
            title: "sofee smith",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg2.src,
            date: "15 july, 2021"
        },
        {
            id: 12,
            title: "mark ciel ",
            texts: "the proggress tracker is fantastic it`s moving to see how much i have improved over time",
            imgSrc: testmaonialImg3.src,
            date: "17 octoper, 2024"
        }
    ]
    return (
        <section className='py-15 '>
            <div className="title py-4">
                <h2 className='text-2xl text-center font-bold text-serif'>Loved by thosands wordWide</h2>
            </div>
            <div className="contol flex  gap-5 items-center">
                <div className="triggers xl:flex gap-5 hidden ">
                    <span ref={spanPrevRef} className='w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center'><ArrowLeft /></span>
                </div>
                <div className="main w-[90%] mx-auto md:w-full  xl:w-[98%] xl:mx-0 overflow-hidden">
                    <div ref={containerRef} className=" grid grid-cols-1 md:grid-cols-2  xl:flex  xl:flex-row gap-5 flex-wrap cont  xl:w-[700%] overflow-hidden ">
                        {cardInfoesArr.map((info) => <TestmonailCard key={info.id} cardInfo={info} />)}
                    </div>
                </div>

                <div className="triggers xl:flex gap-5 hidden ">
                    <span ref={spanNextRef} className='w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center'><ArrowRight /></span>
                </div>
            </div>

        </section>
    )
}


interface CardInfoType {
    id: number,
    title: string,
    texts: string,
    imgSrc: string,
    date: string
}

function TestmonailCard({ cardInfo }: { cardInfo: CardInfoType }) {
    return (
        <div className='bg-green-200 rounded-xl py-4   xl:flex-shrink-0 card ' >
            <div className="head border-b-1 border-slate-500 flex flex-col gap-5 cont my-3">
                <span className='border-1 border-slate-500 h-10 w-10 rounded-full flex items-center justify-center text-gray-700'><Quote className='fill-gray-700' /></span>
                <p className='text-slate-800 w-3/4 pb-3'>{cardInfo.texts}</p>
            </div>
            <div className="foot flex gap-5 mx-5">
                <div className="img w-10 h-10 rounded-full">
                    <Image src={cardInfo.imgSrc} alt={cardInfo.title} width={200} height={200} className='w-full object-contain  rounded-full' />
                </div>
                <div className="title">
                    <h3>{cardInfo.title}</h3>
                    <p>{cardInfo.date}</p>
                </div>
            </div>
        </div>
    )
}

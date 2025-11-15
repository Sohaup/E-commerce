import React from 'react'
import electronicsImg from "@/../public/images/home/electronics.jpg";
import booksImg from "@/../public/images/home/books.jpg";
import menClothesImg from "@/../public/images/home/menClothes.jpg";
import womenClotheImg from "@/../public/images/home/womansClothes.jpg";
import Image from 'next/image';
import { imgInfoType } from '@/app/_components/ui/unitMaper/mapper';
import { Button } from '@/components/ui/button';

export default function VisualsSection() {
    const imgsInfo: imgInfoType[] = [
        {
            description: "high qality machines",
            src: electronicsImg.src,
            texts: "we had a lot of high quality machines from the most populer brands on the entire world"
        },
        {
            description: "interesting books",
            src: booksImg.src,
            texts: "we had an interisting books that wrote by an experts auters  "
        },
        {
            description: "elegant men clothes",
            src: menClothesImg.src,
            texts: "we had alot of elegent clothes for the gentle men  "
        },
        {
            description: "pretty women clothes",
            src: womenClotheImg.src,
            texts: "we had alot of pretty clothes for women that mades you even more beatiful"
        }


    ]
    return (
        <section className='grid grid-cols-1   md:grid-cols-2 lg:grid-cols-4 py-15 gap-2 cont '>            
            {imgsInfo.map((imgInfo) => <ImgContCard key={imgInfo.src} imgInfo={imgInfo} />)}
        </section>
    )
}

function ImgContCard({ imgInfo }: { imgInfo: imgInfoType }) {
    return (
        <div className='img w-full '>
            <div className="container relative overflow-hidden mx-auto">
                <Image src={imgInfo.src} alt={imgInfo.description} width={200} height={200} className='w-full' />
                <div className="wrapper absolute inset-0 bg-black/30 flex flex-col justify-end">
                    <div className="texts cont">
                        <h3 className='text-2xl text-white font-bold'>{imgInfo.description}</h3>
                        <p className='ps-4 text-white font-semibold '>{imgInfo.texts}</p>
                    </div>
                    <div className="footer flex justify-center my-4">
                        <Button className='bg-white text-black hover:bg-black hover:text-white transition-colors duration-500'>Shop</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

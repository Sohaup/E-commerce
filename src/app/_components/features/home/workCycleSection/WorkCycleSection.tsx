import { Button } from "@/components/ui/button";
import { Car, Coffee, RefreshCcw } from "lucide-react";
import Link from "next/link";
import candyImg1 from "@/../public/images/home/slider-image-1.jpeg"
import candyImg2 from "@/../public/images/home/slider-image-2.jpeg"
import candyImg3 from "@/../public/images/home/slider-image-3.jpeg"
import Slider from "@/app/_components/ui/Slidder/Slider";
import { Playfair_Display } from "next/font/google"; 



const playFairDisplayFont = Playfair_Display({
  subsets:['cyrillic']
})



export default function WorkCycleSection() {
  const imgArr = [candyImg1.src , candyImg2.src , candyImg3.src]
  return (
    <section className="cont py-10">

      <div className="details flex flex-col items-center ">
        <div className="title text-center pb-5">
          <h2 className={`font-bold font-sans text-4xl  ` }>How It Works ?</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center w-full justify-between py-10 gap-5 md:gap-0">
        <span className="flex flex-col  ">
          <span className=" w-20 h-20 text-white bg-green-400 rounded-lg shadow-2xl flex items-center justify-center self-center">
            <Coffee />
          </span>
          <h3 className={`text-center  font-semibold ${playFairDisplayFont.className}` }>Pick your Product</h3>
          <p className="text-center">Choose your favourite product from a wide range of options</p>
        </span>
        <span className="flex flex-col ">
          <span className="bg-orange-400  w-20 h-20 text-white rounded-lg shadow-2xl flex items-center justify-center self-center">
            <Car />
          </span>
          <h3 className={`text-center font-semibold ${playFairDisplayFont.className}`}>We deliver fast</h3>
          <p className="text-center">Get your product deliver fast and ready to used </p>
        </span>
        <span className="flex flex-col ">
          <span className="bg-purple-500  w-20 h-20 text-white rounded-lg shadow-2xl flex items-center justify-center self-center">
            <RefreshCcw />
          </span>
          <h3 className={`text-center  font-semibold ${playFairDisplayFont.className}`}>Enjoy your Product</h3>
          <p className="text-center">Enjoy Your Product and give us a feedback</p>
        </span>
        </div>
        <div className="view bg-green-300 rounded-lg w-full  flex justify-between flex-col lg:flex-row">
          <div className="texts p-3 py-10 flex flex-col gap-5 self-center ">
            <h4 className={`text-4xl font-bold font-serif text-white  ${playFairDisplayFont.className}`}>Create Your Perfect Order</h4>
            <p className="font-semibold text-md">save up to 15% when order online thanks to our offers</p>
            <Button className=" self-center lg:self-start bg-orange-400 hover:bg-orange-500 transition-all text-white rounded-xl py-5 ">
              <Link href={"/products"}>Shop now</Link>
            </Button>
          </div>
          <div className="slider w-full lg:w-1/2">
            <Slider imagesPath={imgArr} className="w-full h-[500px]" isHidden={true}/>
          </div>
        </div>
      </div>
    </section>
  )
}


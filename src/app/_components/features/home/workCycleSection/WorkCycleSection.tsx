import { Car, Coffee, RefreshCcw } from "lucide-react";
import colthesSectionImg from "@/../public/images/home/clotheSection.jpg"
import foodsSectionImg from "@/../public/images/home/foodSection.jpg"
import fruitSectionImg from "@/../public/images/home/fruitsSection.jpg"
import { Playfair_Display } from "next/font/google"; 
import SliderSections, { imgInfoType } from "@/app/_components/ui/SliderSections/SliderSections";




const playFairDisplayFont = Playfair_Display({
  subsets:['cyrillic']
})



export default function WorkCycleSection() {
  const imgArr:imgInfoType[] = [
    
    {path:fruitSectionImg.src , title:"Our fruits section " , description:"Enjoy natural organic fruits" , color:"green-500"} ,
    {path:foodsSectionImg.src , title:"Our food section " , description:"Enjoy eating a tasty food" , color:"orange-500"} ,
    {path:colthesSectionImg.src , title:"Our clothes section " , description:"Enjoy Shopping a unique clothes" , color:"purple-500"} 
    
  ]
  return (
    <section className="cont py-10 space-y-10">

      <div className="details flex flex-col  gap-8">
        <div className="title  pb-5">
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
         <SliderSections  imagesPath={imgArr} />       
      </div>
    </section>
  )
}


import Image from "next/image";
import { Playfair_Display } from "next/font/google"; 
import peachImg from "@/../public/images/home/peach.jpg";
import saladImg from "@/../public/images/home/salad.jpg";
import snackImgs from "@/../public/images/home/snack.jpg";
import fruitsImg from "@/../public/images/home/friuts.jpg"; 
import cookImg from "@/../public/images/home/cook.jpg";

const playFairDisplayFont = Playfair_Display({
  subsets:['cyrillic']
})


interface cardInfoType {
  src:string ,
  title:string ,
  texts:string
}


export default function BlogSection() {
  const cardsInfos:cardInfoType[] = [
    {
      src:peachImg.src ,
      title:"what you need to know about plant based protien" ,
      texts:"Nourish co . july 2025"
    } ,
    {
      src:saladImg.src,
      title:"How to build a perfect healthy dishes" ,
      texts:"Nourish co . july 2025"
    } ,
    {
      src:cookImg.src ,
      title:"the schience behind healthy food" ,
      texts:"Nourish co . july 2025"
    } ,
    {
      src:fruitsImg.src ,
      title:"how we orgnaise smart on a bust schedule" ,
      texts:"Nourish co . july 2025"
    } ,
    {
      src:snackImgs.src ,
      title:"why low suger desn`t mean low favor" ,
      texts:"Nourish co . july 2025"
    }
  ]
  return (
    <section className="bg-slate-100  py-15">
      <div className="title pb-5 cont">
        <h2 className="text-4xl font-bold text-center">Our Blog</h2>
      </div>
      <div className="main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center  gap-5 cont" >
       {cardsInfos.map((info)=> <BlogCard key={info.title} cardInfo={info}/>)}
      </div>
    </section>
  )
}
function BlogCard({cardInfo}:{cardInfo:cardInfoType}) {
  return (
    <div className="card group bg-white hover:bg-green-400 rounded-xl shadow-lg transition-all duration-700 ">
      <div className="img overflow-hidden ">
        <Image src={cardInfo.src} alt={cardInfo.title} width={200} height={200} className="w-[500px] h-[300px] object-cover rounded-xl group-hover:scale-150 transition-transform  duration-700"/>
      </div>
      <div className="texts group-hover:text-white font-bold text-center py-4">
        <h3 className={playFairDisplayFont.className}>{cardInfo.title}</h3>
        <p className="font-light ">{cardInfo.texts}</p>
      </div>
    </div>
  )
}
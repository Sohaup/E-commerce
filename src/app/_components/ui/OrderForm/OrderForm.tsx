import { Playfair_Display } from "next/font/google"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const playFairDisplayFont = Playfair_Display({
  subsets:['cyrillic']
})

export default function OrderForm() {
  return (
    <div className="py-15 ">
      <div className="wrap bg-green-400 rounded-xl py-10 cont">
      <div className="texts text-center my-4">
        <h2 className={`text-white text-4xl font-bold ${playFairDisplayFont.className}`  }>GET 15% on Your First Order</h2>
        <p className="text-slate-700">plus early access to our new products</p>
      </div>
      <div className="input relative bg-slate-100 py-2 shadow-lg rounded-[30px] flex w-full md:w-1/2 mx-auto ">
       <Input className="outline-0 border-0 focus-visible:border-0 focus-visible:ring-0 placeholder:text-white placeholder:text-lg placeholder:font-semibold   " />
       <Button className="absolute right-2  rounded-[30px] bg-orange-500 hover:bg-orange-600">Supscripe</Button>
      </div>
     </div>
    </div>
  )
}
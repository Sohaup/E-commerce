import Image from "next/image";
import { NavMenu } from "./_components/NavBar/Navbar";
import saleImg1 from "../../public/sale.webp"
import saleImg2 from "../../public/saleTwo.jpg"
import saleImg3 from "../../public/sale3.jpg"
import saleImg4 from "../../public/slae4.jpg"
import sliderImg1 from "../../public/images/slider-image-1.jpeg"
import sliderImg2 from "../../public/images/slider-image-2.jpeg"
import sliderImg3 from "../../public/images/slider-image-3.jpeg"
import sliderImgMain from "@/../public/images/slider-2.jpeg"
import Slider from "./_components/Slidder/Slider";
import { CategoryType } from "@/types/categoryType";
import CategoriesView from "./_components/categoriesView/CategoriesView";
import { getProducts } from "./products/page";
import Product from "./_components/Product/Product";
import { productType } from "@/types/productType";
import {getServerSession} from "next-auth"
import { authOptions } from "@/auth";
import returnToken from "@/utilities/token";

export async function getCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    method: "GET",
    cache: "no-store"
  })
  const categories = await res.json();
  return categories.data;
}

export default async function Home() {
  const images = [sliderImg1.src, sliderImg2.src, sliderImg3.src];
  const categories: CategoryType[] = await getCategories();
  const products: productType[] = await getProducts();
  const sessionData = await getServerSession(authOptions); 
  
  
  return (
    <main className="cont" >
      <section className="flex  justify-center pb-10 flex-col lg:flex-row  ">
          <div className="slider  w-full lg:w-1/2 z-10 overflow-hidden ">
            <Slider imagesPath={images} className="w-full aspect-square "/>
          </div>          
          <div className="flex flex-row lg:flex-col w-full lg:w-1/4  ">
            <Image src={sliderImg2 } alt="image" className="w-1/2 lg:w-full h-1/2"/>
            <Image src={sliderImg3 } alt="image" className="w-1/2 lg:w-full h-1/2"/>
          </div>
      </section>
      
      <div className=" overflow-hidden ">
        <CategoriesView categories={categories} className="" />
      </div>

      <div className="products my-10  ">
        <div className="  space-y-8 ">

          <div className="product-cont">
            {products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </div>

      </div>
    </main>
  );
}

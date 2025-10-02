import { CategoryType } from "@/types/categoryType";
import CategotyCard from "../../categories/categoriesView/categotyCard/categotyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";



export default function CategoriesSection({ categories }: { categories: CategoryType[] }) {

  return (
    <section className="cont pt-50 pb-15 lg:py-15  ">
      <div className="title my-4 flex justify-between">
        <h2 className={`text-serif font-bold text-4xl  `} >Shop Your Way</h2>
        <Link href="/categories">
          <Button className="bg-green-400 hover:bg-green-500 group rounded-[30px] py-5 flex justify-between relative">
            <span className="text-black font-bold text-lg me-10 group-hover:text-white transition-all">View all </span>
            <span className="bg-white group-hover:text-white group-hover:bg-black transition-all rounded-full w-8 h-8 text-black flex justify-center items-center  ms-auto absolute right-0">
              <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>

      <div className="categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  ">
        {categories.map((category) => (
          <Link href={`/categories/${category._id}`} key={category._id}>
            <CategotyCard category={category} />
          </Link>
        ))}
      </div>


    </section>
  )
}

import React from 'react'
import Slider from '../Slidder/Slider'
import { CategoryType } from '@/types/categoryType'
import Link from 'next/link'



export default function CategoriesView({categories , className}:{categories:CategoryType[] , className:string}) {
  return (
    <div className=''>   
         
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  place-items-center">
            {categories.map((category)=> (
                <Link href={`/categories/${category._id}`} key={category._id}>                 
                <CategoryCard   title={category.name} img={category.image}/>
                </Link>
               
                ))}      
            </div>  
               
                
           
      
    </div>
  )
}

function CategoryCard({title , img}:{title:string , img:string}) {
      return (
        <div className="card">
            <div className="img  ">
                <img src={img} className='w-full block objext-cover aspect-square' />
            </div>
            <div className="title">
                <h3>{title}</h3>
            </div>
        </div>
      )  
}
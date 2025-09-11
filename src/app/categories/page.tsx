import { CategoryType } from '@/types/categoryType'
import React from 'react'
import { getCategories } from '../page'
import CategoriesView from '../_components/categoriesView/CategoriesView';
import { Card , CardTitle  } from '@/components/ui/card';
import Link from 'next/link';

export default async function page() {
    const categories:CategoryType[] = await getCategories(); 

  return (
    <div className='cont grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
      {categories.map((category)=> (
        <Link href={`/categories/${category._id}`} key={category._id} >
        <Card className='h-fit hover:shadow-2xl hover:shadow-orange-200 transition-shadow '>
            <div className="img" >
                <img src={category.image} className='w-full block aspect-square'/>
            </div>
            <CardTitle className='text-2xl font-bold text-center'>
                {category.name}
            </CardTitle>
        </Card>
        </Link>
      ))}
    </div>
  )
}

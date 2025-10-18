import { CategoryType } from '@/types/categoryType'
import React from 'react'
import { getCategories } from '@/services/categoryApi';
import CategoriesView from '@/app/_components/features/categories/categoriesView/CategoriesView';
import { Card , CardTitle  } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default async function page() {
    const categories:CategoryType[] = await getCategories(); 

  return (
    <div className='cont grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-15 '>
      {categories.map((category)=> (
        <Link href={`/categories/${category._id}`} key={category._id} >
        <Card className='h-fit hover:shadow-2xl hover:shadow-green-200 transition-shadow '>
            <div className="img" >
                <Image src={category.image} className='w-full block aspect-square' alt="category image" width={200} height={200}/>
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

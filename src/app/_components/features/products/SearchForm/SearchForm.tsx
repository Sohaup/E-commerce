'use client'
import { Input } from '@/components/ui/input'
import { Filter } from '@deemlol/next-icons'
import { ListTodo } from 'lucide-react'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import FilterPage from '../FilterPage/FilterPage'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Flip } from 'gsap/Flip'
import { searchTheProducts  , getProductData} from '@/store/Slices/productSlice'
import { useDispatch, UseDispatch } from 'react-redux'
import { PayloadAction, UnknownAction } from '@reduxjs/toolkit'

export default function SearchForm({ className }: { className: string }) {
    const [toggleFilter, setToggleFilter] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { contextSafe } = useGSAP({ scope: containerRef })
    const dispatch = useDispatch<any>();
    
    gsap.registerPlugin(Flip);
    const toggleVisibilty = () => {
       setToggleFilter(true)
    };   

    const handleSearch:FormEventHandler = ( e:React.FormEvent<HTMLInputElement> )=>{
        dispatch(searchTheProducts(e.currentTarget.value));        
    }

    return (
        <div className={`${className} mx-auto flex gap-2 border-1 rounded-lg`}>
            <div className="input w-1/2 flex items-center">
                <Input placeholder='...Search Products' className='outline-none ring-0 border-none focus-visible:ring-0 focus-visible:border-none placeholder:text-slate-500 ' onInput={handleSearch}/>
            </div>
            <div onClick={toggleVisibilty} className="filter border-s-1 ms-auto flex items-center p-3 bg-green-400 text-white rounded-tr-lg rounded-br-lg">
                <Filter />
            </div>
            <FilterPage isToggle={toggleFilter} setIsToggle={setToggleFilter} containerRef={containerRef} />
        </div>
    )
}

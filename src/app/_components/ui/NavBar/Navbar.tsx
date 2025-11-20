'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { Handbag, Regex, Search, ShoppingCart , Menu, X } from 'lucide-react';
import storeLogo from "@/../public/images/home/icon.png";
import Image from "next/image"
import { signOut, useSession } from 'next-auth/react';
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import CategoriesMenu from '../categoriesMenu/CategoriesMenu';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/store/store';
import { calcAmount, getCartProducts } from '@/store/Slices/cartSlice';


export function NavMenu() {
  const path = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen , setIsOpen] = useState(false);
  
 return (
    <nav className={`fixed top-0 w-full font-sans  z-40 bg-white py-5  transition-colors  `} ref={navRef} >
      <div className="cont flex justify-between " >
        <div className="brand font-sans flex gap-1 items-center self-center">
          <Image src={storeLogo} alt="store logo" className='w-10 h-10' />
          <span className='text-xl font-bold flex flex-col'>
            <span>Flow</span>
            <span>Cart</span>
          </span>
        </div>
        <NavLinks inMobile={false}  isOpen={isOpen} setIsOpen={setIsOpen}/>
        <SearchForm inMobile={false} />
        <MobileNavigationMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
   
    </nav>
  );
}

function NavLinks({ inMobile  , isOpen , setIsOpen}: { inMobile: boolean , isOpen:boolean , setIsOpen:React.Dispatch<React.SetStateAction<boolean>> }) {
  const path = usePathname();
  const sessionData = useSession();
  const storeState = useSelector((store:StoreType)=> store.cartReducer)   
  const dispatch  = useDispatch<any>();
  const navigate = useRouter();
  useEffect(()=> {
    localStorage.setItem("cart" , JSON.stringify([]));
    dispatch(getCartProducts());
    dispatch(calcAmount());
  } , [])
  async function handleLogOut() {
    try {
      await signOut();
      window.location.href = "/login";
      toast.success("logged out successfuly")
    } catch (err) {
      toast.error("logged out failed")
    }

  }

  function handleNavigate(path:string) {
    setIsOpen(false);
    navigate.push(path);
  }
  return (
    <div className={`links text-lg self-center  ${inMobile ? "block" : "hidden lg:block"}`}>
      <ul className={`flex  gap-3 ${inMobile ? " flex-col my-5" : "flex-row "}`}>
        <li onClick={()=>handleNavigate("/")}><Link  href={"/"} className={`${path == "/" ? "text-green-500 font-bold" : ""}`}>Home</Link></li>
        <li onClick={()=>handleNavigate("/products")} ><Link  href={"/products"} className={`${path == "/products" || path.match(/\/products\/*/) ? "text-green-500 font-bold" : ""}`}>Products</Link></li>
        <li onClick={()=>handleNavigate("/categories")}><Link href={"/categories"} className={`${path == "/categories" ? "text-green-500 font-bold" : ""}`}>Categories</Link></li>
        {
          sessionData.status == "authenticated" ?
            <>
              <li onClick={()=>handleNavigate("/cart")}>
              <Link href={"/cart"} className={`${path == "/cart" ? "text-green-500 font-bold" : ""}`}>
               <span className='relative  '>
                <ShoppingCart/>   
                <span className='absolute -top-2 -left-2 w-5 h-5 bg-green-400 rounded-full text-lg text-white flex justify-center items-center'>
                  {storeState.countOfProducts}
                </span>            
               </span>
              </Link>
              </li>            
              <li ><span onClick={handleLogOut} className='cursor-pointer'>LogOut</span></li>
            </> :
            <>
              <li onClick={()=>handleNavigate("/login")}><Link href={"/login"}>LogIn</Link></li>
              <li onClick={()=>handleNavigate("/register")}><Link href={"/register"}>Register</Link></li>
            </>
        }
      </ul>
    </div>
  )
}


function SearchForm({ inMobile }: { inMobile: boolean }) {
  return (
    <div className={`search-form bg-green-400 ${inMobile ? "flex" : "hidden lg:flex"} gap-1 rounded-[30px] self-center items-center text-white p-1 `}>
      <Search size={35} />
      <Input placeholder='Search'
        className='outline-0 border-0 focus-visible:border-0 focus-visible:ring-0 placeholder:text-white placeholder:text-lg placeholder:font-semibold  ' />
      <Handbag size={25} />
    </div>
  )
}

function MobileNavigationMenu({isOpen , setIsOpen}:{isOpen:boolean , setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  
  return (
    <div className='block lg:hidden self-center '>
     <div className="drawer-toggle">
       {
        isOpen ? <X size={40} onClick={()=> setIsOpen(false)}/>  : <Menu size={40} onClick={()=> setIsOpen(true)}/>
       }
     </div>
     <div className={`drawer-content flex flex-col bg-white overflow-hidden fixed inset-0 top-[100px] transition-[height] duration-700 z-40  ${isOpen ? "  h-full  border-t-2 border-green-400" : "  h-0  "}`}>
       <NavLinks inMobile={true} isOpen={isOpen} setIsOpen={setIsOpen}/>
       <SearchForm inMobile={true}/>
     </div>
    </div>
  )
}


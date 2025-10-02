'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Facebook  , Instagram , Linkedin} from "@deemlol/next-icons";

export default function Footer() {
    const path  = usePathname();
    const sessionData = useSession();
  return (
   <footer className='flex flex-col gap-5 py-15 cont'>
    <div className="navigationMenu flex justify-between">
         <div className="links-1 ">
            <ul className='flex gap-3 flex-col md:flex-row'>
                <li>
                   <Link href={"/"} className={`${path == "/" ? "text-green-500 font-bold" : ""}`}>Home</Link>
                </li>
               {
               sessionData.status == "authenticated" ?
                <>
                <li><span>LogOut</span></li>
                </>
                : <>               
                 <li>
                     <Link href={"/login"} className={`${path == "/login" ? "text-green-500 font-bold" : ""}`}>LogIn</Link>
                </li>
                <li>
                    <Link href={"/register"} className={`${path == "/register" ? "text-green-500 font-bold" : ""}`}>Register</Link>
                </li> 
                </> 
               }
            </ul>
         </div> 
         <div className="icons ">
            <ul className='flex gap-3 '>
                <li>
                    <span className='icon-cont'>
                       <Facebook className='fill-blue-500'/>
                    </span>
                </li>
                <li>
                    <span className='icon-cont'>
                        <Instagram className='fill-fuchsia-500'/>
                    </span>
                </li>
                <li>
                    <span className='icon-cont'>
                       <Linkedin className='fill-blue-900'/>
                    </span>
                </li>
            </ul>
         </div>  
         <div className="links-2 ">
            <ul className='flex gap-3 flex-col md:flex-row'>
             <li>
                 <Link href={"/products"} className={`${path == "/products" || path.match(/\/products\/*/) ? "text-green-500 font-bold" : ""}`}>products</Link>               
             </li>
             <li>
                 <Link href={"/categories"} className={`${path == "/categories" || path.match(/\/categories\/*/) ? "text-green-500 font-bold" : ""}`}>categories</Link>
             </li>
             <li>
                  <Link href={"/brands"} className={`${path == "/brands" || path.match(/\/brands\/*/) ? "text-green-500 font-bold" : ""}`}>brands</Link>
             </li>
            </ul>
         </div>   

    </div>
    <div className="brand">
        <h2 className='text-8xl md:text-9xl font-bold text-center'>FlowCart Store Project</h2>
    </div>
    <div className="copy-right text-lg ">
        <p className='flex justify-between '>
            <span>@2025 all copy right is saved</span>
            <span className='md:border-1 rounded-[30px] p-2 md:hover:bg-slate-100 transition-colors mx-auto'>sohybta560@gmail.com</span>
            <span>Terms & Privacy</span>
        </p>
    </div>
   </footer>
  )
}

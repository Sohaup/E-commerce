'use client'
import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { Regex, ShoppingCart } from 'lucide-react';
import storeLogo from "../../../../public/images/favicon.png"
import Image from "next/image"
import { signOut, useSession } from 'next-auth/react';
import {toast}  from "sonner"

export function NavMenu() {
  const path = usePathname(); 
  const sessionData = useSession();
  const navigate = useRouter();
  async function handleLogOut() {
    try {
    await signOut(); 
    window.location.href = "/login";
    toast.success("logged out successfuly")
    } catch(err) {
      toast.error("logged out failed")
    }

  }
  
  return (
    <nav className='bg-slate-200 fixed top-0 w-full z-50'>
      <Navbar fluid rounded className='cont bg-slate-200'>
        <NavbarBrand as={Link} href="https://flowbite-react.com" className='flex gap-3'>
          <Image src={storeLogo} alt="store logo" className="size-15 " />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Store</span>
        </NavbarBrand>
        <NavbarToggle />

        <NavbarCollapse className='space-y-8  md:flex'>
          <Link href="/" className={`${path == "/" ? "active" : ""} md:self-center`} >
            Home
          </Link>         
          <Link href="/wishList" className={`${path == "/wishList" ? "active" : ""} md:self-center`}>Wish list</Link>
          <Link href="/products" className={`${path == "/products" || path.match(/\/products\/*/) ? "active" : ""} md:self-center`}>Products</Link>
          <Link href="/categories" className={`${path == "/categories" || path.match(/\/categories\/*/) ? "active" : ""} md:self-center`}>Categories</Link>
          <Link href='/brands' className={`${path == "/brands" ? "active" : ""} md:self-center`}> Brands</Link>
           { sessionData.status == "authenticated" ?
           <>
          <Link href="/cart" className={`${path == "/cart" ? "active" : ""} md:self-center`}>
            Cart
          </Link>
           <Link href="/orders" className={`${path == "/orders" ? "active" : ""} md:self-center`}>
            Orders
          </Link> 
           <span className='md:self-center' onClick={handleLogOut}>LogOut</span>
          </>
          : 
          <>
          <Link href="/login" className={`${path == "/login" ? "active" : ""} md:self-center`}>LogIn</Link>
          <Link href="/register" className={`${path == "/register" ? "active" : ""} md:self-center`}>Register</Link>
          </>
            }        
         
          <div className="group flex gap-3 items-center  justify-center py-4">
            <ShoppingCart size={30} className=' stroke-green-800 fill-green-800' />           
          </div>
        </NavbarCollapse>


      </Navbar>
    </nav>
  );
}

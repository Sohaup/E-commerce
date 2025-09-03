'use client'
import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Regex, ShoppingCart } from 'lucide-react';


export function NavMenu() {
  const path = usePathname();
  console.log(path);
  
  return (
    <nav className='bg-slate-200'>
    <Navbar fluid rounded className='cont bg-slate-200'>      
      <NavbarBrand as={Link} href="https://flowbite-react.com" className='flex gap-3'>
        <ShoppingCart size={50} color={"darkgreen"} className='fill-terq/80 stroke-terq'/>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Store</span>
      </NavbarBrand>
      <NavbarToggle />
     
      <NavbarCollapse className='space-y-8  md:flex'>        
        <Link href="/" className={`${path == "/" ? "active" : ""} md:self-center`} >
          Home
        </Link>
        <Link  href="/cart" className={`${path == "/cart" ? "active" : ""} md:self-center`}>
          Cart
        </Link>
        <Link href="/wishList" className={`${path == "/wishList" ? "active" : ""} md:self-center`}>Wish list</Link>
        <Link href="/products" className={`${path == "/products" || path.match(/\/products\/*/) ? "active" : ""} md:self-center`}>Products</Link> 
        <Link href="/categories" className={`${path == "/categories" ? "active" : ""} md:self-center`}>Categories</Link>
        <Link href='/brands' className={`${path == "/brands" ? "active" : ""} md:self-center`}> Brands</Link>        
        <div className="group flex gap-3 items-center  justify-center py-4">
          <ShoppingCart size={30} className='fill-terq stroke-terq'/>
          <span className='cursor-pointer'>Logout</span>
        </div>
      </NavbarCollapse>   
      
     
    </Navbar>
    </nav>
  );
}

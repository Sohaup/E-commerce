import { NavMenu } from '@/app/_components/ui/NavBar/Navbar'
import React from 'react'
import Footer from '../_components/ui/footer/footer'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import ContentProvider from "@/providers/sessionProvider";
import { Asterisk } from 'lucide-react';
import storeLogo from "@/../public/images/home/icon.png"
import Image from 'next/image';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex  gap-2 h-screen  bg-gradient-to-r from-green-300 via-green-600 to-green-900 lg:bg-gradient-to-b lg:from-white lg:via-white lg:to-white `}>
        <ContentProvider>
          {children}
        </ContentProvider>
        <div className="accesory bg-white  bg-radial  from-green-400 to-green-700 hidden lg:block self-center ">
          <div className="cont flex flex-col items-center h-3/4 my-5">
            <Asterisk size={80} color='white'/>
            <span className='bg-white w-40 h-40 rounded-full flex items-center justify-center  my-auto'>
              <Image src={storeLogo} alt="store logo" className='w-20 h-20' width={200} height={200}/>
            </span> 
            <div className="texts  mt-auto mx-auto  w-3/4">
              <h1 className='text-white flex flex-col  gap-2 '>
                <span className='text-md font-sans'>You can easly </span>
                <span className='text-4xl'>Get access To Your Accout And start Enjoing Shopping Freely</span>
              </h1>
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}

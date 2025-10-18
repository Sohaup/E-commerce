import React from 'react'
import { NavMenu } from '../_components/ui/NavBar/Navbar'
import Footer from '../_components/ui/footer/footer'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import ContentProvider from "@/providers/sessionProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "flowCart",
  description: "store project using next js and gsap",

};

export default function MainLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <ContentProvider>
          <NavMenu/>
          {children}
          <Footer/>
        </ContentProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}

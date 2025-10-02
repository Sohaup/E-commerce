import React from 'react';
import storeLogo from "@/../public/images/home/icon.png"
import Image from "next/image";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import type { Metadata } from "next";
import LoginFormContainer from "@/app/_components/features/logIn/logInForm";


export const metadata:Metadata = {
    title:"logIn" ,
    description:"LogIn page for the flowCart store"
}

export default function page() {  

    return (
        <section className="w-full h-full " >
            <MobileLayout />
            <div className="cont authFormLg bg-white hidden    lg:flex items-center ">
                <LoginFormContainer/>
            </div>
        </section>
    )
}

function MobileLayout() {
    return (
        <div className="flex flex-col items-center gap-5 lg:hidden w-screen h-3/4">
            <div className="icon flex flex-col items-center gap-5">
                <span className='bg-white w-40 h-40 rounded-full flex items-center justify-center  my-auto'>
                    <Image src={storeLogo} alt="store logo" className='w-20 h-20' width={200} height={200} />
                </span>
                <h2 className="text-white font-bold text-5xl ">FlowCart</h2>
            </div>
            <div className="more-text my-auto">
                <h3 className="text-white font-sans text-3xl">Welcome Back</h3>
            </div>
            <div className="btn-group">
                <Drawer>
                    <DrawerTrigger className="bg-transparent hover:bg-black text-white font-semibold transition-colors px-15 py-3 rounded-[30px] border-1 border-black ">
                        LogIn
                    </DrawerTrigger>
                    <DrawerContent >
                        <DrawerHeader className="hidden">
                            <DrawerTitle>auth Form (LogIN)</DrawerTitle>
                            <DrawerDescription>Login Form</DrawerDescription>
                        </DrawerHeader>
                        <div className="form py-10">
                         <LoginFormContainer/>
                        </div>                      
                    </DrawerContent>
                </Drawer>
                
            </div>
        </div>
    )
}

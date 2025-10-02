'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import {Provider} from "react-redux";
import AppStore from "@/store/store" ;


export default function ContentProvider({children}:{children: React.ReactNode}) {
 
  return (
    <SessionProvider >
       <Provider store={AppStore}>        
        <div className={`mt-20 `}>
            {children}
        </div>      
        </Provider>      
    </SessionProvider>
  )
}

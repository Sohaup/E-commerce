'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'


export default function ContentProvider({children}:{children: React.ReactNode}) {
  return (
    <SessionProvider >
        <div className="py-40">
            {children}
        </div>        
    </SessionProvider>
  )
}

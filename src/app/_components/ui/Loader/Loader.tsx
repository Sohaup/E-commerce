'use client'
import React from 'react'
import { Spinner, SpinnerProps } from '@/components/ui/shadcn-io/spinner';


export default function Loader() {
   return (
    <div >
     <Spinner variant="circle-filled" color='lightgreen' size={60}/>
    </div>
  )
}

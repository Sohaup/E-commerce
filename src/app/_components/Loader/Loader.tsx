'use client'
import React from 'react'
import { Spinner  , SpinnerProps } from '@/components/ui/shadcn-io/spinner';

export default function Loader() {
    const varients : SpinnerProps['variant'][] =  [
        'pinwheel'
    ]
  return (
    <div>
      <Spinner variant={varients[0]} size={80} className='text-red-500'/>
    </div>
  )
}

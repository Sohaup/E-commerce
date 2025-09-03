import React from 'react'
import Loader from './_components/Loader/Loader'


export default function loading() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
     <Loader/>
    </div>
  )
}

import React from 'react'
import Loader from '../_components/ui/Loader/Loader'


export default function loading() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
     <Loader/>
    </div>
  )
}

import { Rubik } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { Spotlight } from './ui/Spotlight'
import SparklesText from './ui/sparkles-text'

const rubik = Rubik({subsets:['latin'],weight:["300","400","500"]})

const Navbar = () => {
  return (
    <div className='flex justify-between p-4 w-full h-20 items-center bg-black/[0.96] antialiased bg-grid-white/[0.02]'>
      <Spotlight fill='white' className='absolute -top-40 left-0 md:left-60 md:-top-20'/>
        <div className='p-2'>
            <Link href="/"><SparklesText text='EventHop'/></Link>

        </div>
        <div className='gap-2 flex items-center'>
            <Link href="/login" className={`font-semibold ${rubik.className} text-white text-md`}>Sign in</Link>
            <Link href="/events" className={`font-semibold ${rubik.className} text-white text-md`}>Events</Link>
        </div>
    </div>
  )
}

export default Navbar

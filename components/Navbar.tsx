import { Rubik } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { Spotlight } from './ui/Spotlight'
import SparklesText from './ui/sparkles-text'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { Avatar } from './ui/avatar'
import Profile from './Profile'
import { SearchBar } from './SearchBar'
import CreateEvent from './CreateEvent'

const rubik = Rubik({subsets:['latin'],weight:["300","400","500"]})

const Navbar = () => {
  const session = useSession()
  return (
    <div className='flex justify-between p-4 w-full h-20 items-center bg-black/[0.96] antialiased bg-grid-white/[0.02]'>
      <Spotlight fill='white' className='absolute -top-40 left-0 md:left-60 md:-top-20'/>
        <div className='p-2'>
            <Link href="/"><SparklesText className='md:text-5xl' text='EventHop'/></Link>
        </div>
        <div className='gap-4 flex items-center'>
          {session?.status == "authenticated" ? (
            <>
            <CreateEvent/>
            <Profile/>
            </>
          ) : (
            <>
                        <Link href="/login" className={`font-semibold ${rubik.className} text-white text-md`}>Sign in</Link>
                        <Link href="/events" className={`font-semibold ${rubik.className} text-white text-md`}>Events</Link>
            </>
          )}
        </div>
    </div>
  )
}

export default Navbar

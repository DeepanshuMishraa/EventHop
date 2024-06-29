"use client" 

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { AvatarDemo } from './Avatar2'
import { Poppins } from 'next/font/google'
import { Button } from './ui/button'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '@radix-ui/react-avatar'
import { LogOutIcon, PartyPopperIcon, Settings2Icon, User2Icon } from 'lucide-react'

const poppinss = Poppins({subsets:['latin'],weight:["300","400","500"]})

const Profile = () => {

    const session = useSession();
    const name = session?.data?.user?.username?.split("");
  return (
    <DropdownMenu >
        <DropdownMenuTrigger asChild>
            <Button variant={null} className='outline-none'><AvatarDemo/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 bg-gray-900 text-white'>
            <DropdownMenuLabel className={`${poppinss.className}`}>Hello <span className='text-blue-700 font-bold uppercase'>{name}!</span></DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User2Icon className='mr-2 items-center w-4 h-4'/>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <PartyPopperIcon className='mr-2 items-center w-4 h-4'/>
                    Events
                    <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings2Icon className='mr-2 items-center w-4 h-4'/>
                    Settings
                    <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className='hover:text-black'>
                    <LogOutIcon className='mr-2 items-center w-4 h-4'/>
                <button    onClick={()=>signOut({
          redirect:true,
          callbackUrl:`${window.location.origin}/login`
        })}>Logout</button>
                    <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile

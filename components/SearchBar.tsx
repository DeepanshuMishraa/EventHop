"use client"

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Link from "next/link"
import { Spotlight } from "./ui/Spotlight"

  
  export function SearchBar() {
    const [open, setOpen] = useState(false)
  
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])
  
    return (
        <>
        <div className="">
        <MagnifyingGlassIcon className="absolute top-8 ml-3 w-4 h-4"/>
        <Input className="" placeholder="      Hop Topics...." onClick={()=>setOpen(true)}/>
        </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput className="" placeholder="Type a command or search..." />
        <CommandList className = "">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" className="bg-black/[0.96] antialiased bg-grid-white/[0.02]">
          <Spotlight
        fill = "white"
        className="absolute -top-40 left-0 md:left-60 md:-top-20"
        />
            <Link className="cursor-pointer hover:text-blue-700" href="/dashboard"><CommandItem>Events</CommandItem></Link>
            <Link className="cursor-pointer hover:text-blue-700" href="/dashboard/1"><CommandItem>Your Resources</CommandItem></Link>
            <Link href="/update"><CommandItem>Settings</CommandItem></Link>
            <CommandItem>Documentation</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      </>
    )
  }
  
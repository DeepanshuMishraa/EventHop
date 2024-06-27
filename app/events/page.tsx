"use client"

import SparklesText from "@/components/ui/sparkles-text";
import { useSession } from "next-auth/react"

const Events = () => {

  const session = useSession();
  return (
    <div>
      Hello {session?.data?.user?.email} Welcome to <SparklesText text="EventHop"/>
    </div>
  )
}

export default Events

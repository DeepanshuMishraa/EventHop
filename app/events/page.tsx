"use client"

import SparklesText from "@/components/ui/sparkles-text";
import { useSession } from "next-auth/react"

const page = () => {

  const session = useSession();
  const Name = session?.data?.user?.name?.split(" ")[0]
  return (
    <div>
      Hello {Name} Welcome to <SparklesText text="EventHop"/>
    </div>
  )
}

export default page

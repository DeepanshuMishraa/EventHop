"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/Marque";
import { Spotlight } from "./ui/Spotlight";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col  bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden dark:bg-grid-white/[0.05] items-center justify-center relative ">
        <Spotlight
        fill = "white"
        className="-top-40 left-0 md:left-60 md:-top-20"
        />
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "EventHop has transformed how I discover and attend local events. It's so easy to use!",
    name: "Anonymous,IIT Madaras",
    title: "A fantastic platform",
  },
  {
    quote:
      "EventHop has transformed how I discover and attend local events. It's so easy to use!",
    name: "Anonymous,IIT Kanpur",
    title: "A fantastic platform",
  },
  {
    quote:
      "EventHop has transformed how I discover and attend local events. It's so easy to use!",
    name: "Anonymous,IIT Bombay",
    title: "A fantastic platform",
  },
  {
    quote:
      "EventHop has transformed how I discover and attend local events. It's so easy to use!",
    name: "Anonymous,IIIT Delhi",
    title: "A fantastic platform",
  },
  {
    quote:
      "EventHop has transformed how I discover and attend local events. It's so easy to use!",
    name: "Bhumik , NIT Trichy",
    title: "A fantastic platform",
  },
];

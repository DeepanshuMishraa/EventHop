import React from 'react';
import { Manrope } from "next/font/google";
import { Spotlight } from "./ui/Spotlight";
import { Search, Calendar, Bell, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const manrope = Manrope({subsets:['latin'], weight:["300","400","500","700"]})

const Hero = () => {
  return (
    <div className={`${manrope.className} bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden min-h-screen flex items-center justify-center`}>
      <Spotlight
        fill="white"
        className="-top-40 left-0 md:left-60 md:-top-20"
      />
      
      <div className="container mx-auto px-4  relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Gathering Events Made Simple
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              Discover, plan, and join events effortlessly. Your go-to platform for all things social.
            </p>
            <Button className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300">
              <Link href="/events">Get Started</Link>
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white/10 backdrop-filter backdrop-blur-lg p-6 rounded-xl">
              <h2 className="text-white text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <Search className="mr-2 text-white" size={20} />
                  <span>Search events by category, date, or location</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Calendar className="mr-2 text-white" size={20} />
                  <span>RSVP and calendar integration</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Bell className="mr-2 text-white" size={20} />
                  <span>Event reminders and notifications</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Share2 className="mr-2 text-white" size={20} />
                  <span>Social media sharing and integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
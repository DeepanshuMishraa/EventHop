import React from 'react';
import { Manrope } from "next/font/google";
import { Search, Calendar, Bell, Share2, Smartphone, ChevronRight, Star } from 'lucide-react';
import Hero from './Hero'; // Assuming Hero component is in a separate file
import { CardDemo } from './EventCard';
import { InfiniteMovingCardsDemo } from './Reviews';
import { Spotlight } from './ui/Spotlight';
import { Button } from './ui/button';
import { Input } from './ui/input';

const manrope = Manrope({subsets:['latin'], weight:["300","400","500","700"]})

const LandingPage = () => {
  return (
    <div className={`${manrope.className} bg-black text-white`}>
      {/* Featured Events Carousel */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
          {/* Add a carousel component here */}
          <div className="flex max-lg:flex-col md:space-x-4 max-lg:space-y-4 overflow-x-auto">
            <CardDemo/>
            <CardDemo/>
            <CardDemo/>
            <CardDemo/>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How EventHop Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Discover", description: "Find events that match your interests" },
              { icon: Calendar, title: "Plan", description: "Create and manage your own events" },
              { icon: Share2, title: "Connect", description: "Join events and meet new people" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <step.icon className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className=" mt-20  bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden">
      <Spotlight
            fill='white'
            className='bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden'
            />
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          <InfiniteMovingCardsDemo/>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Explore Event Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Music', 'Sports', 'Arts', 'Food', 'Technology', 'Outdoors', 'Networking', 'Education'].map((category) => (
              <div key={category} className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition duration-300">
                <p className="font-semibold">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for the latest events and updates.</p>
          <form className="max-w-md mx-auto flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-white/10 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-r-full hover:bg-purple-700 transition duration-300">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { question: "How do I create an event?", answer: "Creating an event is easy! Just log in, click on 'Create Event', and follow the simple steps." },
              { question: "Can I sell tickets through EventHop?", answer: "Yes, you can sell tickets directly through our platform. We offer secure payment processing and ticket management." },
              { question: "Is EventHop available in my city?", answer: "EventHop is available in many cities worldwide. Check our 'Locations' page for a full list of supported areas." }
            ].map((faq, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <ChevronRight className="mr-2" size={20} />
                  {faq.question}
                </h3>
                <p className="text-gray-300 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
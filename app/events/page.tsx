// app/events/page.tsx
"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Manrope } from "next/font/google";
import { Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const manropee = Manrope({ subsets: ['latin'] })


interface ApiResponse {
  status: number;
  message: string;
  info: Event[];
}

const Events: React.FC = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const deleteEvent = async (eventName: string) => {
    try {
      const res = await axios.delete("/api/events/delete_events", { data: { name: eventName } });
      console.log(`${eventName} Deleted from the database`);
      fetchEvents(); // Refresh the events list after deletion
    } catch (e) {
      console.error("Error occurred:", e);
      setError("Failed to delete event. Please try again later.");
    }
  }

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get<ApiResponse>("/api/events/get_events");
      const { status, message, info } = res.data;

      if (status === 200 && Array.isArray(info)) {
        setEvents(info);
      } else {
        console.error("Unexpected response:", res.data);
        setError(message || "Unexpected data format received from server");
      }
    } catch (e) {
      console.error("Error occurred:", e);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Spotlight
          fill="white"
          className="absolute -top-40 left-0 md:left-60 md:-top-20"
        />

        <div className="p-4 mb-6">
          <h1 className={`${manropee.className} text-center text-6xl max-lg:text-3xl text-white font-bold`}>Featured Events</h1>
        </div>
        <div className="grid md:grid-cols-4 gap-4 grid-rows-1 max-lg:place-items-center max-lg:p-4">
          {loading ? (
            <p className="text-white">Loading events...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : events.length > 0 ? (
            events.map((event, index) => (
              <Card key={index} className="w-[330px]">
                <div>
                  <Button variant={"outline"} onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    deleteEvent(event.name);
                  }}>
                    <Delete />
                  </Button>
                </div>
                <Link href={`/events/${event.id}`}>
                  <CardHeader>
                    <CardTitle>{event.name || "Unnamed Event"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {new Date(event.time).toLocaleTimeString()}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Price:</strong>{event.Price == null ? ' Free' : (
                      `$ ${event.Price}`
                    )}</p>
                    <p><strong>Hosted by:</strong> {event.User.username}</p>
                  </CardContent>
                </Link>
              </Card>
            ))
          ) : (
            <p className="text-white">No events found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;

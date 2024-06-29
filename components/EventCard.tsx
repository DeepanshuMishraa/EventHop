"use client";
import { cn } from "@/utils/cn";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
  username: string;
}

interface Event {
  name: string;
  description: string;
  date: string;
  image: string;
  time: string;
  location: string;
  price: number;
  User: User
}

interface ApiResponse {
  status: number;
  message: string;
  info: Event[];
}

export function CardDemo() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
    <div className="w-full max-w-6xl mx-auto">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-row gap-4 justify-center">
        {events.slice(0, 3).map((event, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl w-[20rem] backgroundImage flex flex-col justify-between p-4",
              "bg-cover bg-center"
            )}
            style={{ backgroundImage: `url(${event.image})` }}
          >
            <div className="absolute inset-0 bg-black opacity-60 transition duration-300 group-hover:opacity-70"></div>
            <div className="flex flex-row items-center space-x-2 z-10">
              <Image
                height={40}
                width={40}
                src={event.image}
                alt="Avatar"
                className="h-10 w-10 rounded-full border-2 object-cover"
              />
              <div className="flex flex-col">
                <p className="font-normal text-base text-gray-50 relative z-10">
                  {event.User.username}
                </p>
                <p className="text-sm text-gray-400">Event Host</p>
              </div>
            </div>
            <div className="text content z-10">
              <h1 className="font-bold text-xl md:text-2xl text-gray-50">
                {event.name}
              </h1>
              <p className="font-normal text-sm text-gray-50 my-2">
                {event.description.length > 100
                  ? `${event.description.substring(0, 100)}...`
                  : event.description}
              </p>
              <p className="text-sm text-gray-200">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </p>
              <p className="text-sm text-gray-200">{event.location}</p>
              <p className="text-sm text-gray-200">Price: ${event.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
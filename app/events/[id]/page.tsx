"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, CreditCardIcon, MapPinIcon } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";

const montserat = Montserrat({subsets:['latin']})

const EventPage = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const id = params.id; // Make sure 'id' is the correct parameter

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/events/get_events/${id}`);
        if (response.status === 200 && response.data) {
          setEvent(response.data.info);
        } else {
          setError("Failed to fetch event data");
        }
      } catch (e) {
        setError("An error occurred while fetching the event");
        console.error("Error occurred:", e);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event found</div>;

  return (
    <>
    <Navbar/>
    <div className={`${montserat.className} font-medium bg-gray-900 min-h-screen flex items-center justify-center p-4`}>
      <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              alt={event.name}
              className="w-full h-full object-cover"
              width={600}
              height={600}
              src={event.image}
            />
          </div>
          <div className="md:w-1/2 p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
            <p className="text-gray-600">{event.description}</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPinIcon className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <CalendarIcon className="w-5 h-5" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <ClockIcon className="w-5 h-5" />
                <span>{new Date(event.time).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <CreditCardIcon className="w-5 h-5" />
                <span>{event.Price ? `$${event.Price}` : 'Free'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <PersonIcon className="w-5 h-5" />
                <span>{event.User.username}</span>
              </div>
            </div>
            <CardFooter className="px-0 pt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Register Now
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
};

export default EventPage;

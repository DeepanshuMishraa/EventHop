"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

const CreateEvent = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const handleSubmit = async () => {
        if (!session) {
            setError("You must be logged in to create an event");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await axios.post("/api/events/create_events", {
                name,
                description,
                date,
                time,
                location,
                price,
                image,
            });
            
            if (response.data.status === 201) {
                console.log("Event created successfully!");
                router.push('/events'); // Redirect to events page or refresh current page
            } else {
                setError(response.data.message || "Failed to create event");
            }
        } catch (e: any) {
            if (e.response?.status === 401) {
                setError("Your session has expired. Please log in again.");
                signIn(); // Redirect to login page
            } else if (e.response?.status === 404) {
                setError("User not found. Please try logging out and back in.");
            } else {
                setError(e.response?.data?.message || "Error in creating event. Please try again.");
            }
            console.error("Error in creating event", e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Create Event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    Host an Event
                    <DialogDescription>
                        Host an event and let people know about it
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-name" className="text-right">Event Name</Label>
                        <Input 
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                            className="col-span-3" 
                            placeholder="What's the name of event?" 
                            id="event-name" 
                        />
                    </div>

                    <div className="grid gap-4 py-4">
                        <Label htmlFor="event-description">Description</Label>
                        <Textarea 
                            onChange={(e) => setDescription(e.target.value)} 
                            value={description}
                            id="event-description" 
                            placeholder="Tell us about the event" 
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <Label htmlFor="event-date">Date</Label>
                        <Input 
                            onChange={(e) => setDate(e.target.value)} 
                            value={date}
                            className="col-span-3" 
                            type="date" 
                            id="event-date" 
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center ">
                        <Label htmlFor="event-time">Time</Label>
                        <Input 
                            onChange={(e) => setTime(e.target.value)} 
                            value={time}
                            className="col-span-3" 
                            type="time" 
                            id="event-time" 
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <Label htmlFor="event-location">Location</Label>
                        <Input 
                            onChange={(e) => setLocation(e.target.value)} 
                            value={location}
                            className="col-span-3" 
                            placeholder="Where is the event?" 
                            id="event-location" 
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <Label htmlFor="event-price" >Price</Label>
                        <Input 
                            onChange={(e) => setPrice(e.target.value)} 
                            value={price}
                            className="col-span-3" 
                            placeholder="How much does it cost?" 
                            id="event-price" 
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center">
                        <Label htmlFor="event-image">Image</Label>
                        <Input 
                            onChange={(e) => setImage(e.target.value)} 
                            value={image}
                            className="col-span-3" 
                            placeholder="Add an image URL" 
                            id="event-image" 
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        type="submit" 
                        onClick={handleSubmit} 
                        disabled={!session || isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : (session ? "Create Event" : "Login to Create Event")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEvent
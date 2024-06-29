import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.username) {
      return NextResponse.json({
        status: 401,
        message: "You must be logged in to create an event",
      });
    }

    const reqBody = await req.json();
    const { name, description, date, location, time, price, image } = reqBody;

    if (!name || !description || !date || !location || !time || !image) {
      return NextResponse.json({
        status: 400,
        message: "Please fill all the required fields",
      });
    }

    // Fetch the user from the database using the username from the session
    const user = await prisma.user.findUnique({
      where: {
        username: session.user.username,
      },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found in the database",
      });
    }

    // Create the event
    const createdEvent = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        time: new Date(`1970-01-01T${time}`),
        location,
        Price: price ? parseInt(price) : null,
        image,
        userId: user.id, // Use the ID from the database user
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Event created successfully",
      data: createdEvent,
    });
  } catch (e) {
    console.error("Error creating event:", e);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while creating the event",
    });
  }
}

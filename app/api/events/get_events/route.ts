import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const event = await prisma.event.findMany({
      select: {
        name: true,
        description: true,
        date: true,
        location: true,
        time: true,
        Price: true,
        image: true,
        User: {
          select: {
            username: true,
          },
        },
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Events fetched successfully",
      info: event,
    });
  } catch (e) {
    return NextResponse.json({
      status: 501,
      message: "An error occured while fetching events",
    });
  }
}

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const url = new URL(request.url);
    console.log(url);
    const username = url.searchParams.get("Name");
    console.log(username);

    if (!username) {
      return NextResponse.json({
        status: 400,
        message: "Username is required",
      });
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        username: true,
        email: true,
        Events: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    return NextResponse.json({
      status: 200,
      details: userDetails,
    });
  } catch (e) {
    console.error("Error fetching user details:", e);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while fetching user details",
    });
  }
}

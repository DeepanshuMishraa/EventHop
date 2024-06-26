import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const salt =  await bcrypt.genSalt(10);
    const hashedPass = bcrypt.hashSync(password,salt);

    // check if user already exists

    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(existingUser){
        return NextResponse.json({
            message:"User Already Exists"
        },{status:401})
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPass,
      },
    });


    return NextResponse.json(
      { message: "User Created Successfully", user },
      { status: 201 }
    );
  } catch (e:any) {
    console.error("Error in POST request:", e);
    return NextResponse.json(
      { message: "Error in creating user", error: e.message },
      { status: 500 }
    );
  }
}

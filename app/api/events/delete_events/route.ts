    import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
    import { NextRequest, NextResponse } from "next/server";


    interface Event {
        name: string,
        description:string,
        date:string,
        location:string,
        time:string,
        price:number,
        image:string,
        User:{
            username:string
        }

    }


    export async function DELETE(req:NextRequest){

        const session = await getServerSession(authOptions);

        const reqBody = await req.json();
        const {name} = reqBody;

        try{
            const deletedEvent = await prisma.event.deleteMany({
                where:{
                    name:name
                }
            })

            return NextResponse.json({
                status:200,
                message:"Event deleted successfully",
                deletedEvent
            })
        }catch(e){
            return NextResponse.json({
                status:501,
                message:"An error occured while deleting event"
            })
        }
    }
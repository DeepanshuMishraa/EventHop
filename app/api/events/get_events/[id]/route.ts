import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:{params:{id: string}}){


    try{
     const id = parseInt(params.id)

    const pEvent = await prisma.event.findUnique({
        where:{
            id:id
        },
        include:{
            User:true
        }
        
    })

    if(!pEvent){
        return NextResponse.json({
            status:404,
            message:"Event not found"
        })
    }

    return NextResponse.json({
        status:200,
        message:"Event fetched successfully",
        info:pEvent
    })
    }catch(e){
        return NextResponse.json({
            status:500,
            message:"Failed to fetch event"
        })
    }

}
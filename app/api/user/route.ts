import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function PUT(request: NextRequest) {
    console.log("uploading file from api route...")

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const newName = searchParams.get('name') 
    if(!userId || !newName) {
        return NextResponse.json({ success: false, error: "No user" }, { status: 400 });
    }
    const response = await prisma.user.update({
        where: { id: userId },
        data: { name: newName },
      });
      // updateJwt(userId);

    if(response) {
        return NextResponse.json({ success: true, user: response })
    } else {
        return NextResponse.json({ success: false, error: "Error changing name" }, { status: 500 });
    }

}


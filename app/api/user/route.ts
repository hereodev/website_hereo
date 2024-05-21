import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(request: NextRequest) {
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
      return response;
    // }).then(res => {
    //     if (res.ok) {
    //         return res.json()
    //     } else {
    //         return res.json().then(err => { throw err })
    //     }
    // })
    // .then(res =>{ console.log("upload ?", res); return NextResponse.json({ success: true, status: res.HttpCode, message: res.Message, uploadUrl: `https://hereotherwise.b-cdn.net/${userId}/${file.name}`})})
    // .catch(err => {console.error(err) ; return NextResponse.json({ success: false, error: err }, { status: 500 })})

    // return response;

    // return NextResponse.json({ success: true })
}


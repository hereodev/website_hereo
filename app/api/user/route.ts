import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function PUT(request: NextRequest) {

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const newName = searchParams.get('name') 
    const newSite = searchParams.get('site')
    const siteNum = searchParams.get('num')
    if(!userId) {
        return NextResponse.json({ success: false, error: "No user" }, { status: 400 });
    }
    if(!newName && newSite && siteNum) {
        console.log("changing site", newSite, siteNum)
        // check that has a linked author or create one
        var author = await prisma.author.findFirst({
            where: { user_id: userId }
        });
        console.log("author", author)

        var sites = null;

        if(!author) {
            var user = await prisma.user.findFirst({
                where: { id: userId }
            });
            if(user && user.name) {
                // console.log("user name:", user.name)
                author = await prisma.author.upsert({
                    where: { 
                        user_id: userId 
                    },
                    update: {
                        name: user.name
                    },
                    create: {
                        user_id: userId,
                        name: user.name
                    }
                });

                    sites = await prisma.site.upsert({
                        where: {
                            author_id_number: {
                                author_id: author.id,
                                number: parseInt(siteNum)
                            }
                        },
                        update: {
                            text: newSite
                        },
                        create: {
                            author_id: author.id,
                            number: parseInt(siteNum),
                            text: newSite,
                        }
                    })
            }
        } else {
                    sites = await prisma.site.upsert({
                        where: {
                            author_id_number: {
                                author_id: author.id,
                                number: parseInt(siteNum)
                            }
                        },
                        update: {
                            text: newSite
                        },
                        create: {
                            author_id: author.id,
                            number: parseInt(siteNum),
                            text: newSite,
                        }
                    })
            
        }
    
        if(sites) {
            return NextResponse.json({ success: true, user: sites })
        } else {
            console.log("error changing site", author, sites)
            return NextResponse.json({ success: false, error: "Error changing site", author, sites }, { status: 500 });
        } 
    
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


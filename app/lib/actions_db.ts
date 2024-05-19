"use server";

import prisma from "@/prisma";

export async function addFileToDb({ file, userId } : { file: File, userId: string }) {
    console.log("uploading file...", file.name, userId);
    const { name, type } = file;
    // const fileExtension = name.split('.').pop();
    const fileRecord = await prisma.media.create({
        data: {
            title:name,
            type,
            // uploaderId: userId,
            user: {
                connect: { id: userId },
            },
        }
    });
    return fileRecord;
}


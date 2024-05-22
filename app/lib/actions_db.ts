"use server";

import { UploadedFile } from "@/global";
import prisma from "@/prisma";
import { Art } from "@prisma/client";
import slugify from "slugify";

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

export async function deleteFileFromDb({ fileId } : { fileId: number }) {
    // console.log("deleting file...", file.name, userId);
    const deletedFile = await prisma.media.delete({
        where: {
            id: fileId,
        }
    });
    return deletedFile;
}

export async function uploadArt2(
    { files, userId, title, subtitle, longText }: 
    { files: UploadedFile[], userId: string, title: string, subtitle?: string, longText?: string }
) {
    // console.log("uploading art...", file.name, userId);
    // const { name, type } = file;
    // const artRecord = await prisma.art.create({
    //     data: {
    //         title,
    //         subtitle,
    //         long_text: longText,
    //         uploader: {
    //             connect: { id: userId },
    //         },
    //         associated_media: {
    //             create: {
    //                 media: {
    //                     create: {
    //                         title: name,
    //                         type,
    //                         uploader: {
    //                             connect: { id: userId },
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     },
    //     include: {
    //         associated_media: true,
    //     },
    // });
    // return artRecord;
}

export async function uploadArt(data : {data: Art & {media?:UploadedFile[], authors?:string[]}}) {
    console.log("uploading art...", data);
    const { media, authors, ...artData } = data.data;
    let slug = slugify(artData.title);
    // check if another Art with the same slug exists, if it does, add a number to the slug, incrementing it until it is unique
    let slugExists = true;
    let slugNumber = 1;
    while(slugExists) {
        const existingArt = await prisma.art.findUnique({
            where: {
                slug: slug,
            },
        });
        if(existingArt) {
            slugNumber++;
            slug = slugify(`${artData.title} ${slugNumber}`);
        } else {
            slugExists = false;
        }
    }
    let mediaRecords = [];
    if(media) {
        console.log("media to be uploaded",media)
    for (const file of media) {
        if(file.url == null) {
            file.url = `https://hereotherwise.b-cdn.net/ec036ad1-60e4-4351-ab65-71fd08003f4d/Screenshot%202024-05-01%20152156.png/${artData.uploader_id}/${file.title}.${file.type ? file.type.split("/")[1] : "png"}`;
        }
        console.log("file", file)
        const uploadedMedia = await prisma.media.create({
            data: {
                title: file.title,
                type: file.type,
                uploader_id: artData.uploader_id,
            },
        });
        console.log("uploaded file", uploadedMedia)
        mediaRecords.push(uploadedMedia);
    }
}
    const artRecord = await prisma.art.create({
        data: {
            slug: slug,
            uploader_id: artData.uploader_id,
            title: artData.title,
            subtitle: artData.subtitle,
            long_text: artData.long_text,

            // uploader: {
            //     connect: { id: artData.uploader_id },
            // },
            // associated_media: {
            //     connect: mediaRecords,
            // },
        },
        // include: {
        //     associated_media: true,
        // },
    });

    const artinMedia = await prisma.mediaInArt.createMany({
        data: mediaRecords.map((mediaRecord) => {
            return {
                media_id: mediaRecord.id,
                art_id: artRecord.id,
            };
        }),
    });
    return {artRecord, artinMedia};
    // return Promise.resolve("foo");
}
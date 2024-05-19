"use server";

import prisma from "@/prisma";

const cdnUrl = process.env.NEXT_PUBLIC_BUNNY_CDN_URL || '';
const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL || '';
const storageZone = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE || '';
const apiKey = process.env.BUNNY_STORAGE_API_KEY || '';



export async function uploadFileToBunny({ file, userId } : { file: File, userId: string }) {
    console.log("uploading file...", file.name, userId);
    const url = `${storageUrl}/${storageZone}/${userId}/${file.name}`.replace(/(?<!:)\/\//g, '/');
    const options = {
        method: 'PUT',
        headers: {
            'AccessKey': apiKey
        },
        body: file
    };
    const response = await fetch(url, options);
    return response;
}

export async function deleteFileFromBunny({ file, userId } : { file: File, userId: string }) {
    // console.log("deleting file...", file.name, userId);
    // const url = `${storageUrl}/${storageZone}/${userId}/${file.name}`.replace(/(?<!:)\/\//g, '/');
    // const options = {
    //     method: 'DELETE',
    //     headers: {
    //         'AccessKey': apiKey
    //     }
    // };
    // const response = await fetch(url, options);
    // return response;
    return { ok: true };
}
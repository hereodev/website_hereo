"use server";

import { UploadedFile } from "@/global";
import prisma from "@/prisma";
import { Art, Author } from "@prisma/client";
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

export async function connectUserToAuthor({ userId, authorName } : { userId: string, authorName: string }) {
    //  if user already has an author, return that author, change the author name if it is different, and return.
    const linkedAuthor = await prisma.author.findFirst({
        where: {
            user_id: userId,
        },
    });
    if(linkedAuthor) {
        if(linkedAuthor.name !== authorName) {
            const updatedAuthor = await prisma.author.update({
                where: {
                    id: linkedAuthor.id,
                },
                data: {
                    name: authorName,
                },
            });
            return { author: updatedAuthor };
        } else {
            return { author: linkedAuthor };
        }
    } 
    const author = await prisma.author.findFirst({
        where: {
            name: authorName,
        },
    });
    if(author && author.user_id !== userId) {
        return { error: "Author already exists with a different user" };
    } else if(author && author.user_id === userId) {
        return { author };
    } else {
        const newAuthor = await prisma.author.create({
            data: {
                name: authorName,
                associated_user: {
                    connect: { id: userId },
                },
            },
        });
        return { author: newAuthor };
    }
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
            console.log("file", file)
            const uploadedMedia = await prisma.media.create({
                data: {
                    uploader_id: artData.uploader_id,
                    title: file.title,
                    type: file.type,
                    url: file.url,
                    alt: file.alt,
                    description: file.alt,
                    storage: "BunnyCDN",
                    author: file.author,
                    date: file.date,
                },
            });
            console.log("uploaded file", uploadedMedia)
            mediaRecords.push(uploadedMedia);
        }
    }

    let artAuthors: Author[] = [];
    if(authors) {
        authors.forEach(async (author) => {
            const authorRecord = await prisma.author.findFirst({
                where: {
                    name: author,
                },
            });
            if(!authorRecord) {
                const newAuthor = await prisma.author.create({
                    data: {
                        name: author,
                    },
                });
                artAuthors.push(newAuthor);
            } else {
                artAuthors.push(authorRecord);
            }
        });
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

    for (const author of artAuthors) {
        const existingAuthor = await prisma.author.findFirst({
            where: {
                name: author.name,
            },
        });

        if(existingAuthor) {
            await prisma.authorship.create({
                data: {
                    art_id: artRecord.id,
                    author_id: existingAuthor.id,
                },
            });
        } else {
            const newAuthor = await prisma.author.create({
                data: {
                    name: author.name,
                },
            });
            await prisma.authorship.create({
                data: {
                    art_id: artRecord.id,
                    author_id: newAuthor.id,
                },
            });
        }
    //     await prisma.authorship.create({
    //         data: {
    //             art_id: artRecord.id,
    //             author: {
    //                 connectOrCreate: {
    //                     where: {
    //                         id: existingAuthor?.id,
    //                     },
    //                     create: {
    //                         name: author.name,
    //                     },
    //                 },
    //             },
    //         },
    //     });
    }

    return {artRecord, artinMedia};
    // return Promise.resolve("foo");
}

export async function getAssociatedAuthor({ userId } : { userId: string }) {
    const author = await prisma.author.findFirst({
        where: {
            user_id: userId,
        },
    });
    return author;
}

export async function getAllAuthors() {
    const authors = await prisma.author.findMany();
    return authors;
}

export async function getUserName({ userId } : { userId: string }) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return user?.name;
}
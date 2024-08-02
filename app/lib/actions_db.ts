"use server";

import { UploadedFile } from "@/global";
import prisma from "@/prisma";
import { Art, Author } from "@prisma/client";
// import slugify from "slugify";

function slugify(text: string): string {
    return text
    .normalize('NFD') // Decompose accented letters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .toLowerCase() // Normalize the string
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove unwanted characters
    .replace(/-+/g, '-') // Avoid multiple hyphens
    .replace(/^-+|-+$/g, '') // Trim hyphens from start and end
    .slice(0, 34); // Limit to 34 characters
}

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

export async function deleteFileFromDbAndBunny({ fileId } : { fileId: number }) {

    const fileToDelete = await prisma.media.findUnique({
        where: {
            id: fileId,
        },
    });
    if(fileToDelete) {
        // delete from BunnyCDN
        // const bunnyDelete = await fetch(`https://storage.bunnycdn.com/delete/${fileToDelete.url}`, {
        //     method: "DELETE",
        //     headers: {
        //         "AccessKey": process.env.BUNNYCDN_ACCESS_KEY,
        //     },
        // });
        // console.log("bunny delete response", bunnyDelete);
        // delete from db
        const deletedFile = await prisma.media.delete({
            where: {
                id: fileId,
            }
        });
        return deletedFile;
    }
    // console.log("deleting file...", file.name, userId);
}
export async function logArtDetails({ artId }: { artId: number }) {
    console.log("Fetching artwork details for ID:", artId);
    const artDetails = await prisma.art.findUnique({
        where: {
            id: artId,
        },
        include: {
            associated_media: true,
            authors: true,
        },
    });

    console.log("Artwork details:", artDetails);

    if (artDetails && artDetails.associated_media.length > 0) {
        console.log("Associated media details:", artDetails.associated_media);
    }

    const authorDetails = await prisma.authorship.findMany({
        where: {
            art_id: artId,
        },
    });

    console.log("Authorship details:", authorDetails);

    const mediaInArtDetails = await prisma.mediaInArt.findMany({
        where: {
            art_id: artId,
        },
    });

    console.log("Media in Art details:", mediaInArtDetails);

    // Note: No actual deletion is performed, only logging
}

/**
 * Deletes an artwork and its associated media, authorship records, and media references.
 * If any operation fails, the transaction is rolled back.
 *
 * @param {object} params - The parameters for deleting art.
 * @param {number} params.artId - The ID of the art to delete.
 * @returns {Promise<object>} - The result of the deletion operations.
 */
export async function deleteArt({ artId }: { artId: number }) {
    console.log("Deleting artwork with ID:", artId);

    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Find the artwork to delete with associated media and authors
            const artToDelete = await prisma.art.findUnique({
                where: { id: artId },
                include: {
                    associated_media: true,
                    authors: true,
                },
            });

            if (!artToDelete) {
                throw new Error(`Art with ID ${artId} not found.`);
            }

            console.log("Found artwork:", artToDelete);

            // Delete media references first to avoid foreign key constraint issues
            const deletedMediaFk = await prisma.mediaInArt.deleteMany({
                where: { art_id: artId },
            });
            console.log("Deleted media references:", deletedMediaFk);

            // Delete associated media
            let deletedMedia = {};
            if (artToDelete.associated_media.length > 0) {
                deletedMedia = await prisma.media.deleteMany({
                    where: {
                        id: {
                            in: artToDelete.associated_media.map((media) => media.media_id),
                        },
                    },
                });
                console.log("Deleted associated media:", deletedMedia);
            }

            // Delete authorship records
            const deletedAuthors = await prisma.authorship.deleteMany({
                where: { art_id: artId },
            });
            console.log("Deleted authorship records:", deletedAuthors);

            // Delete the artwork itself
            const deletedArt = await prisma.art.delete({
                where: { id: artId },
            });
            console.log("Deleted artwork:", deletedArt);

            return {
                deleted_art: deletedArt,
                deleted_authors: deletedAuthors,
                deleted_media: deletedMedia,
                deleted_media_fk: deletedMediaFk,
                deletion_successful: true,
            };
        });

        return result;
    } catch (error) {
        console.error("Error deleting artwork:", error);
        throw error;
    }
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

export async function uploadArt(data : {data: Art & {media?:UploadedFile[], link?:string, authors?:string[], categories?:string[]}}) {
    console.log("uploading art...", data);
    const { media, authors, categories, link, ...artData } = data.data;
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
    // let catego = [];
    // if(data.data.categories) {
    //     catego = data.data.categories.map((category) => {
    //         return {
    //             await prisma.subcategory.findFirst({
    //                 where: {
    //                     name: category,
    //                 }
    //             })
    //         };
    //     });
    // }
    // let subcategoryIds: number[] = [];
    // if (categories) {
    //     for (const category of categories) {
    //         const subCategory = await prisma.subCategory.findFirst({
    //             where: { name: category },
    //         });
    //         if (!subCategory) {
    //             const newSubCategory = await prisma.subCategory.create({
    //                 data: { name: category },
    //             });
    //             subcategoryIds.push(newSubCategory.id);
    //         } else {
    //             subcategoryIds.push(subCategory.id);
    //         }
    //     }
    // }
    let mediaRecords = [];
    // if there is a link, add a media with uploader_id, url, and the storage string is the domain name.
    if(link) {
        const uploadedMedia = await prisma.media.create({
            data: {
                uploader_id: artData.uploader_id,
                type: "link",
                url: link,
                storage: "link",
            },
        });
        mediaRecords.push(uploadedMedia);
    }
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
    if (categories) {
        for (const category of categories) {
            const subCategory = await prisma.subCategory.findFirst({
                where: { name: category },
            });
            if (subCategory) {
                await prisma.artSubCategory.create({
                    data: {
                        art_id: artRecord.id,
                        subcategory_id: subCategory.id,
                    },
                });
            } else {
                const newSubCategory = await prisma.subCategory.create({
                    data: { name: category },
                });
                await prisma.artSubCategory.create({
                    data: {
                        art_id: artRecord.id,
                        subcategory_id: newSubCategory.id,
                    },
                });
            }
        }
    }
    return {artRecord, artinMedia};
    // return Promise.resolve("foo");
}

export async function updateArt({ artId, data }: { artId: number, data: Art & { media?: UploadedFile[], authors?: string[], categories?: string[] } }) {
    console.log("updating art...", data);
    // const { media, authors, ...artData } = data;
    // let slug = slugify(artData.title);
    // // check if another Art with the same slug exists, if it does, add a number to the slug, incrementing it until it is unique
    // let slugExists = true;
    // let slugNumber = 1;
    // while (slugExists) {
    //     const existingArt = await prisma.art.findUnique({
    //         where: {
    //             slug: slug,
    //         },
    //     });
    //     if (existingArt && existingArt.id !== artId) {
    //         slugNumber++;
    //         slug = slugify(`${artData.title} ${slugNumber}`);
    //     } else {
    //         slugExists = false;
    //     }
    // }

    // let mediaRecords = [];
    // if (media) {
    //     console.log("media to be uploaded", media);
    //     for (const file of media) {
    //         console.log("file", file);
    //         const uploadedMedia = await prisma.media.create({
    //             data: {
    //                 uploader_id: artData.uploader_id,
    //                 title: file.title,
    //                 type: file.type,
    //                 url: file.url,
    //                 alt: file.alt,
    //                 description: file.alt,
    //                 storage: "BunnyCDN",
    //                 author: file.author,
    //                 date: file.date,
    //             },
    //         });
    //         console.log("uploaded file", uploadedMedia);
    //         mediaRecords.push(uploadedMedia);
    //     }
    // }

    // let artAuthors: Author[] = [];
    // if (authors) {
    //     for (const author of authors) {
    //         const authorRecord = await prisma.author.findFirst({
    //             where: {
    //                 name: author,
    //             },
    //         });
    //         if (!authorRecord) {
    //             const newAuthor = await prisma.author.create({
    //                 data: {
    //                     name: author,
    //                 },
    //             });
    //             artAuthors.push(newAuthor);
    //         } else {
    //             artAuthors.push(authorRecord);
    //         }
    //     }
    // }

    // const updatedArt = await prisma.art.update({
    //     where: {
    //         id: artId,
    //     },
    //     data: {
    //         slug: slug,
    //         title: artData.title,
    //         subtitle: artData.subtitle,
    //         long_text: artData.long_text,
    //     },
    // });

    // const existingMediaInArt = await prisma.mediaInArt.findMany({
    //     where: {
    //         art_id: artId,
    //     },
    // });

    // const mediaToDelete = existingMediaInArt.filter((mediaInArt) => {
    //     return !mediaRecords.some((mediaRecord) => mediaRecord.id === mediaInArt.media_id);
    // });

    // const mediaInArtToDelete = mediaToDelete.map((mediaInArt) => mediaInArt.media_id);

    // const deletedMediaInArt = await prisma.mediaInArt.deleteMany({
    //     where: {
    //         media_id: {
    //             in: mediaInArtToDelete,
    //         },
    //     },
    // });

    // const deletedMedia = await prisma.media.deleteMany({
    //     where: {
    //         id: {
    //             in: mediaToDelete.map((mediaInArt) => mediaInArt.media_id),
    //         },
    //     },
    // });

    // const existingAuthorships = await prisma.authorship.findMany({
    //     where: {
    //         art_id: artId,
    //     },
    // });

    // const authorshipsToDelete = existingAuthorships.filter((authorship) => {
    //     return !artAuthors.some((author) => author.id === authorship.author_id);
    // });

    // const authorshipsToDeleteIds = authorshipsToDelete.map((authorship) => authorship.author_id);

    // const deletedAuthorships = await prisma.authorship.deleteMany({
    //     where: {
    //         author_id: {
    //             in: authorshipsToDeleteIds,
    //         },
    //     },
    // });

    // const deletedAuthors = await prisma.author.deleteMany({
    //     where: {
    //         id: {
    //             in: authorshipsToDelete.map((authorship) => authorship.author_id),
    //         },
    //     },
    // });

    // const createdAuthorships = await Promise.all(
    //     artAuthors.map((author) => {
    //         return prisma.authorship.create({
    //             data: {
    //                 art_id: artId,
    //                 author_id: author.id,
    //             },
    //         });
    //     })
    // );

    // return {
    //     updatedArt,
    //     deletedMediaInArt,
    //     deletedMedia,
    //     deletedAuthorships,
    //     deletedAuthors,
    //     createdAuthorships,
    // };
    return {
        updatedArt:null,
        deletedMediaInArt:null,
        deletedMedia:null,
        deletedAuthorships:null,
        deletedAuthors:null,
        createdAuthorships:null,
    }
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
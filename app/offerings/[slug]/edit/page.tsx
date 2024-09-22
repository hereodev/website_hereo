// import EditForm from "@/app/_components/upload/edit-form";
import UploadFiles from "@/app/_components/upload/upload-files";
import UploadForm from "@/app/_components/upload/upload-form";
import { auth } from "@/auth"
import prisma from "@/prisma";
import type { Metadata } from "next";

import { redirect } from 'next/navigation'
import EditForm from "./_components/edit-input";
import { ExtendedArt } from "@/global";
export const metadata: Metadata = {
    title: ":Her(e) Otherwise: Edit Offering",
    // title: ":Her(e) Otherwise" + " | " + process.env.NODE_ENV,
    // description: "This platform responds to the urgent need to gather an open, interactive, and expanding community of black women engaged in the broadest possible range of self-determined acts and operations within the disciplines of architecture and urban design, and within the discourse of all spatial practices.",
    icons: {
        icon: '/favicon_hereo.svg', // /public path
    },
};


export default async function EditOffering({ params }: { params: { slug: string } }) {
    const session = await auth();
        // const router = useRouter();

    const offering = await prisma.art.findUnique({
        where: {
            slug: params.slug
        },
        include: {
            associated_media: {
                include: {
                    Media: true
                }
            },
            uploader: {
                select: {
                    name: true,
                    email: true, role:true,
                }
            },
            authors: {
                include: {
                    author: true
                }
            },
            SubCategories: {
                include: {
                    SubCategory: true
                }
            },
        }
    }) as unknown as ExtendedArt;
    if(session && session.user && session.user.id && offering && session.user.id === offering?.uploader_id) {
        return (
            <main>
                <div>
                    {/* <p>This page will soon let you edit this artwork: {params.slug}</p> */}
                    <pre className="max-w-64 max-h-32 overflow-scroll text-xs">{JSON.stringify(offering, null, 2)}</pre>

                    {/* <EditInput name="title" label="Title" placeholder="Type here" defaultVal={offering.title} required={true} /> */}

                    <EditForm art={offering} /> 
                     {/* userId={session.user.id} /> */}
                </div>
            </main>
        )
    } else {
        // router.push(`/offerings/`);
        redirect(`/offerings/`);
        return <main>Redirecting...</main>
    }
}
import EditForm from "@/app/_components/upload/edit-form";
import UploadFiles from "@/app/_components/upload/upload-files";
import UploadForm from "@/app/_components/upload/upload-form";
import { auth } from "@/auth"
import prisma from "@/prisma";

import { redirect } from 'next/navigation'

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
            authors: true,
        }
    })
    if(session && session.user && session.user.id && offering && session.user.id === offering?.uploader_id) {
        return (
            <main>
                <div>
                    <p>This page will let you edit this artwork: {params.slug}</p>
                    <pre className="max-w-64 max-h-32 overflow-scroll text-xs">{JSON.stringify(offering, null, 2)}</pre>

                    <EditForm art={offering} userId={session.user.id} />
                </div>
            </main>
        )
    } else {
        // router.push(`/offerings/`);
        redirect(`/offerings/`);
        return <main>Redirecting...</main>
    }
}
import UploadForm from "@/app/_components/upload/upload-form";
import { auth } from "@/auth"
import prisma from "@/prisma";

export default async function EditOffering({ params }: { params: { slug: string } }) {
    const session = await auth();

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
            uploader: true,
            authors: true,
        }
    })
    return (
        <main>
            {
                session && session.user && session.user.id &&
                    <div>
                        <p>Editing: {params.slug}</p>
                        <pre>{JSON.stringify(offering, null, 2)}</pre>
                    </div>
            }
        </main>
    )
}
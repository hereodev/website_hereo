import UploadForm from "@/app/_components/upload/upload-form";
import { auth } from "@/auth"


export default async function EditOffering({ params }: { params: { slug: string } }) {
    const session = await auth();
    return (
        <main>
            {
                session && session.user && session.user.id &&
                    <div>Editing: {params.slug}</div>
            }
        </main>
    )
}
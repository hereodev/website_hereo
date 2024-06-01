import UploadForm from "@/app/_components/upload/upload-form";
import { auth } from "@/auth"


export default async function UploadArt() {
    const session = await auth();

    return (
        <main>
            {
                session && session.user && session.user.id &&
                <UploadForm userId={session.user.id} />
            }
        </main>
    )
}
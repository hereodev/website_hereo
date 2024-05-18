import UploadForm from "@/app/_components/upload/upload-form";
import { auth } from "@/auth"


export default async function Indx() {
    const session = await auth();

    return (
        <main>
            <h1>Index</h1>
            {/* <p>Home page</p> */}
            {
                session && session.user && session.user.id &&
                <UploadForm userId={session.user.id} />

            }
        </main>
    )
}
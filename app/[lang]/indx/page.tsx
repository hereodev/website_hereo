import { auth } from "@/auth"


export default async function Indx() {
    const session = await auth();

    return (
        <main>
            <h1>Index</h1>
            
        </main>
    )
}
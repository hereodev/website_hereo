
export default function UploadArt() {

    async function upload(data: FormData) {
        'use server'

        const file: File | null = data.get("file") as unknown as File;
        if (!file) {
            throw new Error("No file");
        }
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        return { success: true }
    }

    return (
        <main>
            <h1>Upload Work</h1>
            <form action={upload} className="form">
                <input 
                    type="file" 
                    name="file" 
                    className="file-input w-full max-w-xs" 
                />

                <input type="submit" value="Upload" className="btn btn-outline hover:btn-primary" />

            </form>
        </main>
    )
}
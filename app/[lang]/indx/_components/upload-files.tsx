"use client"

import { useState } from "react"

type FileUpload = {
    file: File;
    progress: number;
    uploaded: boolean;
    url?: string;
}

/**
 * Component for uploading files.
 */
 function UploadFiles() {
    const [file, setFile] = useState<File[]>([])
    const [files, setFiles] = useState<FileUpload[]>([])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        try {
            for(const uploadedFile of file) {
                const formData = new FormData()
                formData.set('file', uploadedFile)
                const res = await fetch('/api/bunny', {
                    method: 'PUT',
                    body: formData
                })
                if (!res.ok){ 
                    throw new Error(await res.text())
                } else {
                    console.log("File uploaded successfully", res.json())
                }
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <h1>Upload Art</h1>
            <form onSubmit={onSubmit} className="form flex flex-col w-full">
                <input 
                    type="file" 
                    name="file" 
                    multiple
                    className="file-input file-input-bordered w-full max-w-sm" 
                    onChange={(e) => {
                        // setFile(e.target.files?.[0])
                        // console.log("FILES?", e.target.files)
                        if(e.target.files === null) return;
                        const selectedFiles = Array.from(e.target.files);
                        setFile(selectedFiles);
                        setFiles(selectedFiles.map(file => ({ file, progress: 0, uploaded: false })));
                        console.log("FILES?", e.target.files);
                    }
                    }
                />

                <input type="submit" value="Upload" className="btn btn-primary" />

            </form>
            <pre>{JSON.stringify(files, null, 2)}</pre>
            {
                files?.map((uploadedFile) => {
                    return (
                        <div key={uploadedFile.file.name} className="card">
                            <div className="card-body">
                                <h2 className="card-title">{uploadedFile.file.name}</h2>
                                <div className="progress">
                                    <div className="progress-bar" style={{width: `${uploadedFile.progress}%`}}></div>
                                </div>
                                {uploadedFile.uploaded && <a href={uploadedFile.url}>View</a>}
                            </div>
                        </div>
                    )
                })
            }
        </main>
    )
}
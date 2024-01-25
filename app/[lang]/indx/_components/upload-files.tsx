"use client"

import { useState } from "react"

type FileUpload = {
    file: File;
    progress: number;
    uploaded: boolean;
    url?: string;
}

export default function UploadFiles() {
    const [file, setFile] = useState<File>()
    const [files, setFiles] = useState<FileUpload[]>([])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        try {
            const formData = new FormData()
            formData.set('file', file)
            const res = await fetch('/api/bunny', {
                method: 'PUT',
                body: formData
            })
            if (!res.ok){ 
                throw new Error(await res.text())
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <h1>Upload Art</h1>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="file" 
                    name="file" 
                    className="file-input file-input-sm w-full max-w-xs" 
                    onChange={(e) => setFile(e.target.files?.[0])}
                />

                <input type="submit" value="Upload" className="btn btn-primary" />

            </form>
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
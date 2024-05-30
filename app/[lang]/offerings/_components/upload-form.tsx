"use client"

import { useState } from "react"

export default function UploadArt() {
    const [file, setFile] = useState<File>()

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
            if (!res.ok) throw new Error(await res.text())
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <h1>Offerings</h1>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="file" 
                    name="file" 
                    className="file-input w-full max-w-xs" 
                    onChange={(e) => setFile(e.target.files?.[0])}
                />

                <input type="submit" value="Upload" className="btn btn-primary" />

            </form>
        </main>
    )
}
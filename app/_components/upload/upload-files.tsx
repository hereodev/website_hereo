"use client"

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FilePreview from './file-preview';
import { deleteFileFromBunny } from '@/app/lib/actions_bunny';
import { set } from 'zod';

type UploadedFile = {
    file: File;
    progress: number | undefined;
    uploaded: boolean;
    path?: string;
};

const UploadFiles = ({userId} : { userId: string }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
	const maxSizeMb = 10;
	const accept = {
		"image/*": [".png", ".gif", ".jpeg", ".jpg"],
		"video/*": [".mp4", ".mkv", ".avi"],
		"text/plain": [".txt"],
		"application/msword": [".doc"],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
		"application/vnd.ms-powerpoint": [".ppt"],
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
        "application/pdf": [".pdf"],
	};
	const acceptedFileExtensions = Object.values(accept).flat();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxSize: maxSizeMb * 1024 * 1024, // {maxSizeMb}MB
        accept: accept,
        multiple: true,
        onDropRejected: (fileRejections) => {
            console.log('Rejected files:', fileRejections);
        },
        onDrop: (acceptedFiles) => {
            console.log("acceptedFiles", acceptedFiles)
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
            const filesToUpload = acceptedFiles.map((file) => ({ file, progress: 0, uploaded: false }));
            setFileUploads((prevFileUploads) => [...prevFileUploads, ...filesToUpload]);
            const uploadFiles = async () => {
                for (const file of filesToUpload) {
                    // setFileUploads((prevFileUploads) => [...prevFileUploads, { file, progress: undefined, uploaded: false }]);
                    console.log("file", file.file)
                    const formData = new FormData();
                    formData.append('file', file.file);
                    formData.append('userId', userId);
                    const uploaded = await fetch(`/api/bunny?userId=${userId}`, {
                        method: 'PUT',
                        body: formData,
                    // }).catch((error) => {
                    //     console.error("Error uploading file", error);
                    });
                    // update progress of upload to 100%
                    if (uploaded.ok) {
                        setFileUploads((prevFileUploads) => prevFileUploads.map((f) => {
                            if (f.file === file.file) {
                                return { ...f, uploaded: true, progress: 100};
                            }
                            return f;
                        }));
                    console.log("uploaded", uploaded)
                }
            }
            console.log("ARE YOU GONNA UPLOAD")
            uploadFiles();
        }
    }});

    return (
        <>
            <div {...getRootProps({
                'aria-label': 'drag and drop area'
            })} className={`join w-full ${isDragActive ? "border-dashed border-primary" : ""}`}>
                {/* <input className="hidden" /> */}
                {/* <div className="indicator"> */}
                    {/* <span className="indicator-item badge badge-secondary">new</span>  */}
                    <button className="btn bg-primary text-primary-content border border-primary rounded-l-sm join-item uppercase">Choose Files</button>
                {/* </div> */}
                <input {...getInputProps()} multiple className="file-input file-input-bordered join-item flex flex-col items-center" />
                {isDragActive ? (
                    <div className={`w-full border  rounded-r-sm border-l-0 grow flex flex-col justify-center p-1 border-dashed border-primary`}>
                        <p className="">{"Drop the files here ..."}</p>
                    </div>
                ) : (
                    <div className={`w-full border border-base-content rounded-r-sm border-l-0 grow flex flex-col justify-center p-1`}>
                        <p className="">{"Click to select files, or drop them here."}</p>
                    </div>
                )}
            </div>
                {files.length > 0 && (
                    <div>
                        <h4>Selected Files:</h4>
                        <pre className="overflow-x-auto">{JSON.stringify(fileUploads, null, 2)}</pre>
                            {fileUploads.map((uploadedFile, index) => {
                                const file = uploadedFile.file;
                                const deleteCurrentFile = async () => {
                                    const deleted = await fetch(`/api/bunny?userId=${userId}&path=${userId}/${file.name}`, {
                                        method: 'DELETE',
                                        body: JSON.stringify({ file, userId }),
                                    })
                                    console.log("deleted", deleted)
                                    if(deleted.ok) {
                                        setFiles(files.filter((f) => f !== file));
                                        setFileUploads(fileUploads.filter((f) => f.file !== file));
                                    }
                                };
                                return(
                                <div key={index}>
                                    <FilePreview file={file} deleteFile={deleteCurrentFile} progress={uploadedFile.progress} />
                                    {/* <FilePreview key={index} file={file} deleteFile={deleteCurrentFile} /> */}
                                    {
                                        (index < files.length - 1) &&
                                            <div className="divider"></div> 
                                    }
                                </div>

                                )
                            })}
                    </div>
                )}
        </>
    );
};

export default UploadFiles;
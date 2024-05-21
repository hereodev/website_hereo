"use client"

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FilePreview from './file-preview';
import { deleteFileFromBunny } from '@/app/lib/actions_bunny';
import { set } from 'zod';
import { UploadedFile } from '@/global';


const UploadFiles = ({userId, media, setMedia} : { userId: string, media: UploadedFile[], setMedia: React.Dispatch<React.SetStateAction<UploadedFile[]>> }) => {
    const [files, setFiles] = useState<File[]>([]);
    // const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
    const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
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
	const acceptedFileExtensions = Object.values(accept).join(", ");

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxSize: maxSizeMb * 1024 * 1024, // {maxSizeMb}MB
        accept: accept,
        multiple: true,
        onDropRejected: (fileRejections) => {
            console.log('Rejected files:', fileRejections);
            setRejectedFiles(fileRejections.map((fileRejection) => fileRejection.file));
        },
        onDrop: async (acceptedFiles) => {
            console.log("acceptedFiles", acceptedFiles)
            try {
                setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
                const filesToUpload = acceptedFiles.map((file) => ({ file, progress: 0, uploaded: false }));
                setMedia((prevFileUploads) => [...prevFileUploads, ...filesToUpload]);
                // const uploadFiles = async () => {
                for (const file of filesToUpload) {
                    // setMedia((prevFileUploads) => [...prevFileUploads, { file, progress: undefined, uploaded: false }]);
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
                        const responseJson = await uploaded.json();
                        const uploadUrl = responseJson.uploadUrl;
                        console.log("at URL", uploadUrl)
                        // update Db
                        setMedia((prevFileUploads) => prevFileUploads.map((f) => {
                            if (f.file === file.file) {
                                return { ...f, uploaded: true, progress: 100, url: uploadUrl};
                            }
                            return f;
                        }));
                    console.log("uploaded", uploaded)
                    } else {
                        // TODO: if file not uploaded, alert user
                    }
                // }
                // uploadFiles();
                }
            } catch (error) {
                console.error("Error uploading files", error);
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
                    <button className="btn bg-primary bg-opacity-70 text-primary-content h-[140px] border border-base-content border-opacity-30 rounded-l-sm join-item uppercase">Choose Files</button>
                {/* </div> */}
                <input {...getInputProps()} multiple className="file-input file-input-bordered join-item flex flex-col items-center" />
                {isDragActive ? (
                    <div className={`w-full border rounded-r-sm border-l-0 grow flex flex-col justify-center p-1 border-dashed border-primary`}>
                        <p className="">{"Drop the files here ..."}</p>
                    </div>
                ) : (
                    <div className={`w-full border border-base-content border-opacity-30 rounded-r-sm border-l-0 grow flex flex-col justify-center p-1`}>
                        <p>{"Click to select files, or drop them here."}</p>
                        <p className="text-xs">Accepted file types are: {acceptedFileExtensions}</p>
                    </div>
                )}
            </div>
            {
                rejectedFiles.length > 0 && rejectedFiles.map((file, index) => {
                    const removeFile = () => {
                        setRejectedFiles(rejectedFiles.filter((f) => f !== file));
                    };
                    setTimeout(() => {
                        removeFile();
                    }, 5000);
                    return (
                        <div key={index} className="flex flex-row text-sm justify-between items-center border border-error rounded p-2 m-2">
                            <p><span className="italic">{file.name}</span> is not an accepted format</p>
                            <button onClick={removeFile}>OK</button>
                        </div>
                    )
                })
            }
                {files.length > 0 && (
                    <div>
                        {/* <h4>Selected Files:</h4>
                        <pre className="overflow-x-auto">{JSON.stringify(media, null, 2)}</pre> */}
                        {media.map((uploadedFile, index) => {
                            const file = uploadedFile.file;
                            const deleteCurrentFile = async () => {
                                const deleted = await fetch(`/api/bunny?userId=${userId}&path=${userId}/${file.name}`, {
                                    method: 'DELETE',
                                    body: JSON.stringify({ file, userId }),
                                })
                                console.log("deleted", deleted)
                                if(deleted.ok) { 
                                    setFiles(files.filter((f) => f !== file));
                                    setMedia(media.filter((f) => f.file !== file));
                                }
                            };
                            const onFileInfoChange = (field: string, value: string) => {
                                console.log("onFileInfoChange", field, value)
                                setMedia((prevFileUploads) => prevFileUploads.map((f) => {
                                    if (f.file === file) {
                                        return { ...f, [field]: value };
                                    }
                                    return f;
                                }));
                            }
                        
                        
                            return(
                                <div key={index}>
                                    <FilePreview uploadedFile={uploadedFile} 
                                        deleteFile={deleteCurrentFile} 
                                        progress={uploadedFile.progress} 
                                        onFileInfoChange={onFileInfoChange}
                                    />
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
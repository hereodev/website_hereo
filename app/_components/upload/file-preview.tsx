"use client"

import { FaFile } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { auth } from '@/auth';
import { UploadedFile } from '@/global';


type FilePreviewProps = {
    uploadedFile: UploadedFile;
    userId?: string;
    progress?: number;
    deleteFile?: () => void;
};

const FilePreview: React.FC<FilePreviewProps> = ({ uploadedFile, userId, progress, deleteFile }) => {
    const { name, type } = uploadedFile.file;
    const title = name.split('.').slice(0, -1).join('');

    // Function to generate image preview URL
    const getImagePreviewUrl = (): string | undefined => {
        if (type.startsWith('image/')) {
            return URL.createObjectURL(uploadedFile.file);
        }
        return undefined;
    };

    const getFileIcon = (): React.ReactNode => {
        if (type.startsWith('image/')) {
            return <img src={getImagePreviewUrl()} alt={name} style={{height:"50px", width:"auto", maxWidth:"100%"}} />;
        } else if (type === 'application/pdf' || type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || type === 'text/plain') {
            return <FaFile className="w-12 h-12" />;
        }
        return null;
    };

    return (
        <div className={`file-preview flex flex-row max-w-screen ${(!progress || progress<100) && "opacity-50"}`}>
            <div className={`image-preview w-14 min-w-14 flex flex-col items-center justify-between mx-2`}>
                {getFileIcon()}
                {progress === 100 ? (
                    <progress className="progress w-full" value={progress} max="100"></progress>
                ) : (
                    <progress className="progress w-full" max="100"></progress>
                )}                
            </div>
            <form className="file-info grow">
                {/* TODO: renaming file if wanted?? */}
                {/* <input type="text" className="input w-full font-semibold" /> */}
                <label className="input flex items-center gap-2 h-8">
                    <span className="font-semibold">Title</span>
                    <input type="text" defaultValue={title} className="grow" placeholder={title} />
                </label>
                <label className="input flex items-center gap-2 h-8">
                    <span className="font-semibold">Description</span>
                    <input type="text" defaultValue="" className="grow" placeholder="Enter a description of the picture" />
                </label>
                <label className="input flex items-center gap-2 h-8">
                    <span className="font-semibold">Author(s)</span>
                    <input type="text" defaultValue="" className="grow" placeholder="" />
                </label>
                <label className="input flex items-center gap-2 h-8">
                    <span className="font-semibold">Type</span>
                    {type}
                </label>
                <label className="input flex items-center gap-2 h-8">
                    <span className="font-semibold">Size</span> 
                    {uploadedFile.file.size < 1024 * 1024 
                        ? (uploadedFile.file.size / 1024).toFixed(2) + ' KB' 
                        : (uploadedFile.file.size / 1024 / 1024).toFixed(2) + ' MB'}
                </label>
                {/* <p>Progress : {progress || "??"}</p> */}
            </form>
            {
                !progress || (progress && progress >= 100) && (
                    <div 
                        className="flex items-center justify-center hover:text-warning hover:cursor-pointer m-1"
                        onClick={deleteFile}
                    >
                        <FiTrash className="w-6 h-6" />
                    </div>
                )
            }
        </div>
    );
};

export default FilePreview;
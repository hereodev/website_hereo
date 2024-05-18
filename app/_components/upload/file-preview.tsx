"use client"

import { FaFile } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { auth } from '@/auth';


type FilePreviewProps = {
    file: File;
    userId?: string;
    progress?: number;
    deleteFile?: () => void;
};

const FilePreview: React.FC<FilePreviewProps> = ({ file, userId, progress, deleteFile }) => {
    const { name, type } = file;

    // Function to generate image preview URL
    const getImagePreviewUrl = (): string | undefined => {
        if (type.startsWith('image/')) {
            return URL.createObjectURL(file);
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
            <div className="file-info grow">
                {/* TODO: renaming file if wanted?? */}
                <input type="text" defaultValue={name} className="input w-full font-semibold" />
                <p>Type: {type}</p>
                <p>Size: {file.size} bytes</p>
                {/* <p>Progress : {progress || "??"}</p> */}
            </div>
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
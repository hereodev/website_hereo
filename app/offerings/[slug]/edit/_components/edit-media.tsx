"use client";

// import { ExtendedArt } from "@/global";
import { Media } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaFileAlt, FaFilePdf, FaFilePowerpoint, FaFileWord, FaTrash, FaVideo } from "react-icons/fa"
import { deleteFileFromDbAndBunny } from "@/app/lib/actions_db";

const EditMedia = ({media, artId} : {media: Media, artId: number}) => {

    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [deleted, setDeleted] = useState<boolean>(false)
    const [clickedDelete, setClickedDelete] = useState<boolean>(false)
    const [approveDelete, setApproveDelete] = useState<boolean>(false)
    useEffect(() => {
        async function handleDelete() {
            if(clickedDelete && approveDelete) {

                const del = await deleteFileFromDbAndBunny({ fileId: media.id });


                // const del = await deleteArt({ artId: art.id });
                if(del && del.deletion_successful) {
                    setDeleted(true);
                }

                // wait 3 seconds then setDeleted(true)
                // setTimeout(() => {
                //     setDeleted(true);
                // }, 3000);
            }
        }
        handleDelete();
    }, [approveDelete]); // Added art.id to the dependency array as it's used in the effect


    if(deleted || (media.url && (media.type == "link" || (new URL(media.url).hostname === "www.youtube.com" || new URL(media.url).hostname === "youtu.be" || new URL(media.url).hostname === "vimeo.com")))) {
        return null
    }

    return (

        <div className="overlapper w-36 h-36">
            <div id="preview" className=" w-36 h-36 relative opacity-65 z-0 flex items-center justify-center" >
                {
                    media.type && media.type.includes("image") && media.url ? (
                        <Image src={media.url} alt={media.alt || media.title || ""} 
                        // width={144} height={144} 
                        fill={true}
                        objectFit="cover" 
                        objectPosition="center"
                        // style={{objectFit: "cover", objectPosition: "center"}}
                        // className="w-full h-full object-cover"
                        />
                    ) : media.type && media.type.includes("video") && media.url ? (
                        <FaVideo className="w-12 h-12" />
                        
                    ) : media.type && media.type === "application/pdf" && media.url ? (
                        <FaFilePdf className="w-12 h-12" />
                        
                    ) : media.type && (media.type === "application/vnd.ms-powerpoint" || media.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") && media.url ? (
                        <FaFilePowerpoint className="w-12 h-12" />
                        
                    ) : media.type && media.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && media.url ? (
                        <FaFileWord className="w-12 h-12" />
                        
                    ) : media.url && (new URL(media.url).hostname === "www.youtube.com" || new URL(media.url).hostname === "youtu.be" || new URL(media.url).hostname === "vimeo.com") ? (
                        // <div className="h-screen w-full relative">
                        <FaVideo className="w-12 h-12" />
                        
                    ) : media.url && media.title ? (
                        <FaFileAlt className="w-12 h-12" />
                        
                    ) : null
                }
            </div>
            <div id="title_btns" className="w-36 h-36 flex flex-col z-20">
                <div id="title" className="w-36 h-4 text-xs bg-black bg-opacity-25 text-white truncate" title={media.title || ""}>
                    {media.title || media.url}
                </div>
                <div id="buttons" className="w-36 h-32 text-xs flex flex-col flex-nowrap items-end justify-end">
                    <button className="btn btn-square btn-error"
                            onClick={async () => {
                                setClickedDelete(true)
                                const modal = document.getElementById('delete_modal_'+media.id);
                                if (modal instanceof HTMLDialogElement) { // This checks if modal is not null and is a dialog element
                                    modal.showModal();
                                }
                                setClickedDelete(false)
                            }}
                    
                    >
                    {
                        clickedDelete ?
                        <span className="loading loading-spinner loading-xs text-error"></span>
                        :
                        <FaTrash />
                    }
                    </button>

                </div>
            </div>
            <dialog id={"delete_modal_"+media.id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Deleting Media</h3>
                <p className="py-4">Are you sure you want to delete this media?</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn" onClick={()=>setApproveDelete(false)}>Cancel</button>
                    <button className="btn btn-error" onClick={()=>setApproveDelete(true)}>Delete</button>
                </form>
                </div>
            </div>
        </dialog>

        </div>
        
    )
}

export default EditMedia;

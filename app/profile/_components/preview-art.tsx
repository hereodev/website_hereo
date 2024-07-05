"use client"

import { Art } from "@prisma/client"
import Link from "next/link"
import { FiEdit, FiTrash } from "react-icons/fi"
import { deleteArt } from "@/app/lib/actions_db"
import { useState, useEffect } from "react"

export default function PreviewArt({ art } : {art: Art}) {

    const [deleted, setDeleted] = useState<boolean>(false)
    const [clickedDelete, setClickedDelete] = useState<boolean>(false)
    const [approveDelete, setApproveDelete] = useState<boolean>(false)

    useEffect(() => {
        async function handleDelete() {
            if(clickedDelete && approveDelete) {
                const del = await deleteArt({ artId: art.id });
                if(del.deletion_successful) {
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


    if(deleted) {
        return null
    }

    return (
        <div key={art.slug} className={`flex flex-row items-center w-full border border-dashed p-1`}>
        <Link href={`/offerings/${art.slug}`} className="grow hover:underline text-xs">{art.title}</Link>
        <Link href={`/offerings/${art.slug}/edit`} className="btn btn-square hover:text-primary" title="Edit">
          <FiEdit />
        </Link>
        <button className="btn btn-square hover:text-error" title="Delete" 
          // aria-disabled={true} disabled
          onClick={async () => {
            setClickedDelete(true)
            const modal = document.getElementById('delete_modal_'+art.id);
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
                <FiTrash />
            }
        </button>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id={"delete_modal_"+art.id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Deleting</h3>
                <p className="py-4">Are you sure you want to delete this work?</p>
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
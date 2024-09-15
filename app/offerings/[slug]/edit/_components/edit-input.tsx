"use client";

import { UploadedFile } from "@/global";
import { Art } from "@prisma/client";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
// import { updateArtTitle } from "@/app/lib/actions_db";
// import { useDebouncedCallback } from 'use-debounce';
import { updateArtTitle, updateArtSubtitle, updateArtLongText } from "@/app/lib/actions_db";
import Tiptap from "@/app/_components/upload/tiptap3";

type InputProps = {
    name: keyof (Art & {media?:UploadedFile[], authors?:string[], categories?:string[]});
    label: string;
    placeholder: string;
    defaultVal: string;
    required?: boolean;
    description?: string;
    errorMessage?: string;
    type?: string;
}
// const WatchedInput = ({name, label, placeholder, defaultVal, required = false, description, errorMessage, type = "text"}: InputProps) => {
//     return (
//         <label className="form-control w-full">
//             <div className="label pb-1">
//                 <span className="label-text title-txt">{label}</span>
//                 {
//                     required && (
//                         <span className="label-text-alt text-error text-sm opacity-80">required*</span>
//                     )
//                 }
//             </div>
//             <input 
//                 type={type} 
//                 placeholder="Type here" 
//                 className="input input-bordered w-full" 
//                 {...register(name, { required })} 
//                 aria-invalid={errors[name] ? "true" : "false"}
//                 defaultValue={defaultVal || ""}
//             />
//             {
//                 errors[name] && (
//                     <div className="label">
//                         <span className="label-text-alt text-error flex flex-row items-center">
//                             <FiAlertCircle className="text-lg mr-2" />
//                             {errorMessage || ""}
//                         </span>
//                         {
//                             errors[name]?.type == "required" && (
//                                 <span className="label-text-alt">{description || required ? "This field is required" : ""}</span>
//                             )
//                         }
//                     </div>
//                 )
//             }
//         </label>
//     )
// }

const EditForm = ({art} : {art: Art}) => {
// const EditInput = ({name, label, placeholder, defaultVal = "", required = false, description, errorMessage, type = "text"}: InputProps) => {
    const [titleValue, setTitle] = useState(art.title);
    const [titleChanged, setTitleChanged] = useState(false);
    const [subtitleValue, setSubtitle] = useState(art.subtitle);
    var longText = art.long_text || "";
    // if longtextvalue starts and ends with '"' then remove them
    if (longText.startsWith('"') && longText.endsWith('"')) {
        longText = longText.slice(1, longText.length-1);
    }
    const [longTextValue, setLongText] = useState(longText);
    return (
        <div>
            <div className="w-full">
                <label className="form-control w-full">
                    <div className="label pb-1">
                        <span className="label-text title-txt">Title</span>
                    </div>
                    <div className="flex flex-row w-full">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full flex-grow" value={titleValue || ""}
                            onChange={(e) => setTitle(e.target.value)} aria-invalid="false"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                updateArtTitle({artId: art.id, newTitle: titleValue});
                            }}
                        >{
                            titleChanged ? 
                            <span>Saved</span>
                            : 
                            <span>Save</span>
                        }</button>
                    </div>
                {/* </div> */}
                </label>
            </div>

            <div className="w-full">
                <label className="form-control w-full">
                    <div className="label pb-1">
                        <span className="label-text title-txt">Subtitle</span>
                    </div>
                    <div className="flex flex-row w-full">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full flex-grow" value={subtitleValue || ""}
                            onChange={(e) => setSubtitle(e.target.value)} aria-invalid="false"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                updateArtSubtitle({artId: art.id, newSubtitle: subtitleValue || ""});
                            }}
                        >Save</button>
                    </div>
                {/* </div> */}
                </label>
            </div>

            <label className="form-control">
                            <div className="label pb-1">
                                <span className="label-text title-txt">Content</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </div>
                            {/* <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea> */}
                            <Tiptap setContent={setLongText} initialContent={longTextValue} />
                            <button
                            className="btn btn-primary"
                            onClick={() => {
                                // updateArtSubtitle({artId: art.id, newSubtitle: subtitleValue || ""});
                                updateArtLongText({artId: art.id, newLongText: longTextValue || ""});
                            }}
                        >Save</button>

            </label>

        </div>
    )
}

export default EditForm;
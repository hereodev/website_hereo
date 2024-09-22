"use client";

import { ArtWithSubCategories, ExtendedArt, UploadedFile } from "@/global";
import { Art } from "@prisma/client";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
// import { updateArtTitle } from "@/app/lib/actions_db";
// import { useDebouncedCallback } from 'use-debounce';
import { updateArtTitle, updateArtSubtitle, updateArtLongText, updateArtAuthors, setCategories as setCategoriesDb, updateArtCategories } from "@/app/lib/actions_db";
import Tiptap from "@/app/_components/upload/tiptap3";
import CategoriesSelect from "@/app/_components/upload/categories-select";
import EditMedia from "./edit-media";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Authorship from "@/app/_components/upload/authorship";

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

const EditForm = ({art} : {art: ExtendedArt}) => {
// const EditInput = ({name, label, placeholder, defaultVal = "", required = false, description, errorMessage, type = "text"}: InputProps) => {
    const [titleValue, setTitle] = useState(art.title);
    const [titleChanged, setTitleChanged] = useState(false);
    const [subtitleValue, setSubtitle] = useState(art.subtitle);
    const [categories, setCategories] = useState<string[]>(art.SubCategories.map((subcat,i) => subcat.SubCategory.name));
    const [authors, setAuthors] = useState<string[]>(art.authors.map((authorship, idx) => authorship.author.name));
    const [link, setLink] = useState(art.associated_media.filter((mediaWrapper) => mediaWrapper.Media.type === "link")[0]?.Media.url);


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

            <CategoriesSelect selectedCategories={categories} setSelectedCategories={setCategories} />
            <button
                className="btn btn-primary w-full"
                onClick={() => {
                    setCategoriesDb({artId: art.id, categories: categories});
                }}
            >Save</button>

            <label className="form-control">
                <div className="label pb-1">
                    <span className="label-text title-txt">Content</span>
                    {/* <span className="label-text-alt">Alt label</span> */}
                </div>
                {/* <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea> */}
                <Tiptap setContent={setLongText} initialContent={longTextValue} />
                <button
                    className="btn btn-primary"
                    onClick={async (e) => {
                        // updateArtSubtitle({artId: art.id, newSubtitle: subtitleValue || ""});
                        updateArtLongText({artId: art.id, newLongText: longTextValue || ""});
                        // const upCat = await updateArtCategories({artId: art.id, categories: categories});
                    }}
                >Save</button>

            </label>

            {/* <div className="w-full">
                <label className="form-control w-full">
                    <div className="label pb-1">
                        <span className="label-text title-txt">Author(s)</span>
                    </div>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                    {
                        art.authors.map((authorship, idx) => {
                            const author = authorship.author;
                            return (
                                <div key={author.name + idx} className="badge badge-info gap-2">
                                    <FaX className="w-2 h-2" />
                                    <span className="label-text">{author.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <Authorship userId={"ec036ad1-60e4-4351-ab65-71fd08003f4d"} authors={authors} setAuthors={setAuthors} />
                <button
                    className="btn btn-primary h-full"
                    onClick={async (e) => {
                        // updateArtLongText({artId: art.id, newLongText: longTextValue || ""});
                        const updatedAuthor = await updateArtAuthors({artId: art.id, authors: authors});
                        if(updatedAuthor) {
                            // console.log("Authors updated");
                            // console.log(updatedAuthor.artAuthors);
                        }
                    }}
                >Save</button>
            </div>

            <div className="w-full">
                <label className="form-control w-full">
                    <div className="label pb-1">
                        <span className="label-text title-txt">Media</span>
                    </div>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                    {
                        art.associated_media.map((mediaWrapper) => {
                            const media = mediaWrapper.Media; // Access the nested Media property
                            return (
                                <EditMedia key={media.id} media={media} artId={art.id} />
                            )
                        })
                    }
                    {/* <button className="btn hover:border hover:border-primary hover:text-primary w-36 h-36 flex justify-center items-center">
                        <FaPlus className="w-12 h-12" />
                    </button> */}
                </div>
            </div>


            <div className="w-full">
                <label className="form-control w-full">
                    <div className="label pb-1">
                        <span className="label-text title-txt">Link</span>
                    </div>
                    <div className="flex flex-row w-full">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full flex-grow" value={link || ""}
                            onChange={(e) => setLink(e.target.value)} aria-invalid="false"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                // updateArtTitle({artId: art.id, newTitle: titleValue});
                            }}
                        >{
                            titleChanged ? 
                            <span>Saved</span>
                            : 
                            <span>Save</span>
                        }</button>
                    </div>
                </label>
            </div>




        </div>
    )
}

export default EditForm;
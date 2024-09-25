"use client";

import { ArtWithSubCategories, ExtendedArt, UploadedFile } from "@/global";
import { Art } from "@prisma/client";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
// import { updateArtTitle } from "@/app/lib/actions_db";
// import { useDebouncedCallback } from 'use-debounce';
import { updateArtTitle, updateArtSubtitle, updateArtLongText, updateArtAuthors, setCategories as setCategoriesDb, updateArtCategories, updateLinkId } from "@/app/lib/actions_db";
import Tiptap from "@/app/_components/upload/tiptap3";
import CategoriesSelect from "@/app/_components/upload/categories-select";
import EditMedia from "./edit-media";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Authorship from "@/app/_components/upload/authorship";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

const EditForm = ({art} : {art: ExtendedArt}) => {
// const EditInput = ({name, label, placeholder, defaultVal = "", required = false, description, errorMessage, type = "text"}: InputProps) => {
    const [titleValue, setTitle] = useState(art.title);
    const [titleStatus, setTitleStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const [subtitleValue, setSubtitle] = useState(art.subtitle);
    const [subtitleStatus, setSubtitleStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const [categories, setCategories] = useState<string[]>(art.SubCategories.map((subcat) => subcat.SubCategory.name));
    const [categoriesStatus, setCategoriesStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const [authors, setAuthors] = useState<string[]>(art.authors.map((authorship) => authorship.author.name));
    const [authorsStatus, setAuthorsStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const [link, setLink] = useState(art.associated_media.filter((mediaWrapper) => mediaWrapper.Media.type === "link")[0]?.Media.url);
    const [linkId, setLinkId] = useState(art.associated_media.filter((mediaWrapper) => mediaWrapper.Media.type === "link")[0]?.Media.id);
    const [linkStatus, setLinkStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    let longText = art.long_text || "";
    if (longText.startsWith('"') && longText.endsWith('"')) {
        longText = longText.slice(1, longText.length - 1);
    }
    const [longTextValue, setLongText] = useState(longText);
    const [longTextStatus, setLongTextStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSave = async (saveFn: () => Promise<void>, setStatus: React.Dispatch<React.SetStateAction<"idle" | "loading" | "success" | "error">>) => {
        setStatus("loading");
        try {
            await saveFn();
            setStatus("success");
            setTimeout(() => setStatus("idle"), 2000); // reset after 2 seconds
        } catch (error) {
            setStatus("error");
        }
    };
    // var longText = art.long_text || "";
    // // if longtextvalue starts and ends with '"' then remove them
    // if (longText.startsWith('"') && longText.endsWith('"')) {
    //     longText = longText.slice(1, longText.length-1);
    // }
    // const [longTextValue, setLongText] = useState(longText);
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
                            className={`btn ${titleStatus === "error" ? "btn-error" : titleStatus === "success" ? "btn-success" : "btn-primary"}`}
                            onClick={() => handleSave(async () => { await updateArtTitle({artId: art.id, newTitle: titleValue}); }, setTitleStatus)}
                        >
                            {titleStatus === "loading" ? <AiOutlineLoading3Quarters className="animate-spin" /> : titleStatus === "success" ? "Saved" : "Save"}
                        </button>
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
                            className={`btn ${subtitleStatus === "error" ? "btn-error" : subtitleStatus === "success" ? "btn-success" : "btn-primary"}`}
                            onClick={() => handleSave(async () => { await updateArtSubtitle({artId: art.id, newSubtitle: subtitleValue || ""}); }, setSubtitleStatus)}
                        >
                            {subtitleStatus === "loading" ? <AiOutlineLoading3Quarters className="animate-spin" /> : subtitleStatus === "success" ? "Saved" : "Save"}
                        </button>
                    </div>
                {/* </div> */}
                </label>
            </div>

            {/* Categories input */}
            <CategoriesSelect selectedCategories={categories} setSelectedCategories={setCategories} />
            <button
                className={`btn w-full ${categoriesStatus === "error" ? "btn-error" : categoriesStatus === "success" ? "btn-success" : "btn-primary"}`}
                onClick={() => handleSave(() => setCategoriesDb({artId: art.id, categories}), setCategoriesStatus)}
            >
                {categoriesStatus === "loading" ? <AiOutlineLoading3Quarters className="animate-spin" /> : categoriesStatus === "success" ? "Saved" : "Save"}
            </button>

            <label className="form-control">
                <div className="label pb-1">
                    <span className="label-text title-txt">Content</span>
                    {/* <span className="label-text-alt">Alt label</span> */}
                </div>
                {/* <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea> */}
                <Tiptap setContent={setLongText} initialContent={longTextValue} />
                <button
                    className={`btn ${longTextStatus === "error" ? "btn-error" : longTextStatus === "success" ? "btn-success" : "btn-primary"}`}
                    onClick={() => handleSave(async () => { await updateArtLongText({artId: art.id, newLongText: longTextValue || ""}); }, setLongTextStatus)}
                >
                    {longTextStatus === "loading" ? <AiOutlineLoading3Quarters className="animate-spin" /> : longTextStatus === "success" ? "Saved" : "Save"}
                </button>

            </label>


            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <Authorship userId={"ec036ad1-60e4-4351-ab65-71fd08003f4d"} authors={authors} setAuthors={setAuthors} />
                <button
                    className={`btn h-full ${authorsStatus === "error" ? "btn-error" : authorsStatus === "success" ? "btn-success" : "btn-primary"}`}
                    onClick={() => handleSave(async () => {
                        const response = await updateArtAuthors({artId: art.id, authors});
                        if ('error' in response) {
                            throw new Error(response.message);
                        }
                    }, setAuthorsStatus)}
                >
                    {authorsStatus === "loading" ? <AiOutlineLoading3Quarters className="animate-spin" /> : authorsStatus === "success" ? "Saved" : "Save"}
                </button>
                {/* <button
                    className="btn btn-primary h-full"
                    onClick={async (e) => {
                        // updateArtLongText({artId: art.id, newLongText: longTextValue || ""});
                        const updatedAuthor = await updateArtAuthors({artId: art.id, authors: authors});
                        if(updatedAuthor) {
                            // console.log("Authors updated");
                            // console.log(updatedAuthor.artAuthors);
                        }
                    }}
                >Save</button> */}
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
                        <p>{linkId}</p>
                    </div>
                    <div className="flex flex-row w-full">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full flex-grow" value={link || ""}
                            onChange={(e) => setLink(e.target.value)} aria-invalid="false"
                        />
                        <button
                            className={`btn ${linkStatus === "error" ? "btn-error" : linkStatus === "success" ? "btn-success" : "btn-primary"}`}
                            onClick={() =>
                                handleSave(
                                    async () => {
                                        if (link) {
                                            await updateLinkId({ mediaId: linkId, newLink: link });
                                        }
                                    },
                                    setLinkStatus
                                )
                            }
                        >
                            {linkStatus === "loading" ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : linkStatus === "success" ? (
                                <span>Saved</span>
                            ) : (
                                <span>Save</span>
                            )}
                        </button>
                    </div>
                </label>
            </div>




        </div>
    )
}

export default EditForm;
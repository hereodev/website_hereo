"use client"

import { useEffect, useState } from 'react';
import UploadFiles from './upload-files';
import { UploadedFile } from '@/global';
import { Art } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useFormState, useFormStatus } from 'react-dom';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import SubmitButton from '@/app/_components/submit-button';
import Tiptap from './tiptap3';
import { uploadArt } from '@/app/lib/actions_db';
import { redirect } from 'next/navigation';
import CategoriesSelect from './categories-select';
import Link from 'next/link';
import Authorship from './authorship';

const UploadForm = ({userId} : {userId: string}) => {
    // const [name, setName] = useState("");

    const [media, setMedia] = useState<UploadedFile[]>([]);
    const [mediaUpdated, setMediaUpdated] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [publish, setPublish] = useState<boolean>(true);
    const [authors, setAuthors] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const [editorContent, setEditorContent] = useState<string>('')
    const handleContentChange = (reason: any) => {
        setEditorContent(reason)
    }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState<string | null>(null);
    const { 
        register, 
        formState: { errors },
        handleSubmit, 
        watch 
    } = useForm<Art & {media?:UploadedFile[], authors?:string[], categories?:string[]}>({
        // defaultValues: {
        //   title: art?.title || "",
        //   subtitle: art?.subtitle || "",
        // }
    });

    const handleMediaChange = (newMedia: UploadedFile[]) => {
        setMedia(newMedia);
    }

    useEffect(() => {
        console.log("media updated:", media)
    }, [media])

    const onSubmit: SubmitHandler<Art & {media?:UploadedFile[], authors?:string[], categories?:string[]}> = async (data) => {
        setIsSubmitting(true);
        // console.log("data", data);
        // setTimeout(() => {
        //     setIsSubmitting(false);
        // }, 3000);

        data.uploader_id = userId;
        data.long_text = JSON.stringify(editorContent);
        data.media = media;
        data.authors = authors;
        data.categories = categories;
        // data.category = category;
        // data.authors = selectedAuthors.map((author) => author.id);
        // TODO: prevent sending if no categories, no authors
        console.log("DATA TO BE UPLOADED", data);
        let uploadedArt;
        try {
            uploadedArt = await uploadArt({data: JSON.parse(JSON.stringify(data))});
            console.log("uploaded art from form:", uploadedArt)
        } catch (error) {
            console.error("Error uploading art", error)
        }

        if(uploadedArt?.artRecord?.slug) {
            setIsSubmitting(false);
            setSubmitted(uploadedArt.artRecord.slug);
            // redirect(`/offerings/${uploadedArt.artRecord.slug}`)
        }
        
    }

    // const [errorMessage, dispatch] = useFormState(onSubmit, undefined);

    type InputProps = {
        name: keyof (Art & {media?:UploadedFile[], authors?:string[], categories?:string[]});
        label: string;
        placeholder: string;
        required?: boolean;
        description?: string;
        errorMessage?: string;
        type?: string;
    }
    const WatchedInput = ({name, label, placeholder, required = false, description, errorMessage, type = "text"}: InputProps) => {
        return (
            <label className="form-control w-full">
                <div className="label pb-1">
                    <span className="label-text text-xl font-semibold text-primary">{label}</span>
                    {
                        required && (
                            <span className="label-text-alt text-error text-sm opacity-80">required*</span>
                        )
                    }
                </div>
                <input 
                    type={type} 
                    placeholder="Type here" 
                    className="input input-bordered w-full" 
                    {...register(name, { required })} 
                    aria-invalid={errors[name] ? "true" : "false"}
                />
                {
                    errors[name] && (
                        <div className="label">
                            <span className="label-text-alt text-error flex flex-row items-center">
                                <FiAlertCircle className="text-lg mr-2" />
                                {errorMessage || ""}
                            </span>
                            {
                                errors[name]?.type == "required" && (
                                    <span className="label-text-alt">{description || required ? "This field is required" : ""}</span>
                                )
                            }
                        </div>
                    )
                }
            </label>
        )
    }

    return(
        <div>
            <h1>Upload Work</h1>

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                encType="multipart/form-data" 
                className="flex flex-col gap-4"
            >
                <WatchedInput name="title" label="Title" required placeholder="Title" />

                <WatchedInput name="subtitle" label="Subtitle" placeholder="Subtitle" />

                {/* Catégorie */}
                <CategoriesSelect selectedCategories={categories} setSelectedCategories={setCategories} />

                <Authorship userId={userId} authors={authors} setAuthors={setAuthors} />

                {/* URL Vidéo */}

                <label className="form-control">
                    <div className="label pb-1">
                        <span className="label-text text-xl font-semibold text-primary">Content</span>
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </div>
                    {/* <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea> */}
                    <Tiptap setContent={setEditorContent} />
                </label>
                {/* <p>{editorContent}</p> */}

                <UploadFiles userId={userId} media={media} setMedia={setMedia}  />
                {/* <h4>Selected Files:</h4>
                <pre className="overflow-x-auto text-xs">{JSON.stringify({media: media}, null, 2)}</pre> */}

                {/* TODO: publish? */}
                <div className="form-control w-full">
                    <div className="label pb-1">
                        <span className="label-text-alt text-error text-sm opacity-80">required*</span>
                    </div>
                    <label className="label-text flex flex-row gap-2">
                    <input 
                        type="checkbox" 
                        name="chbx-me" 
                        className="checkbox checkbox-primary" 
                        placeholder="Please enter your name"
                        defaultChecked={publish}
                        onChange={(e) => setPublish(e.target.checked)}
                    />                    
                        <span className="text-xl font-semibold">Make available on Her(e) Otherwise</span>
                    </label>
                    <div className="label">
                        <span className="label-text-alt flex flex-row items-center">
                            You can decide to remove your work from this website at any time.
                        </span>
                    </div>

                </div>

                {/* Legal accept */}

                {
                    submitted ? (
                        <div className="alert alert-success">
                            <div className="flex-1">
                                <label className="label">Success</label>
                                <p>Your offering was successfully uploaded</p>
                            </div>
                            <Link href={`/offerings/${submitted}`} className="btn btn-success">Go to your offering</Link>
                            <Link href={`/offerings/`} className="btn btn-success">Submit another</Link>
                        </div>
                    )
                    :
                    <UploadButton pending={isSubmitting} />

                }
            </form>
        </div>
    )
}

function UploadButton({ pending } : {pending: boolean}) {
    // const { pending } = useFormStatus();
 
    return (
        <button className={`btn btn-primary mt-4 w-full`} disabled={pending} aria-disabled={pending}>
            {
                pending ?
                <span className="text-primary text-2xl flex flex-row items-base gap-2">
                    {/* <span className="loading loading-spinner loading-md"></span> */}
                    Uploading your project
                    <span className="loading loading-dots loading-sm"></span>
                </span>
                :
                <span className="w-full flex justify-between items-center">Submit <FiArrowRight className="h-5 w-5" /></span>
            }
        </button>
    );
}


export default UploadForm;
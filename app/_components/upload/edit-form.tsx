"use client"

import { updateArtTitle } from '@/app/lib/actions_db';
import { useEffect, useState } from 'react';
import UploadFiles from './upload-files';
import { UploadedFile } from '@/global';
import { Art, Media, User } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useFormState, useFormStatus } from 'react-dom';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import SubmitButton from '@/app/_components/submit-button';
import Tiptap from './tiptap3';
import { updateArt, uploadArt } from '@/app/lib/actions_db';
import { redirect } from 'next/navigation';
import CategoriesSelect from './categories-select';
import Link from 'next/link';
import Authorship from './authorship';

type UploadFormProps = {
  userId: string;
//   art: Art & {associated_media?:Media, media?:UploadedFile[], uploader?:User, authors?:string[], categories?:string[]};
    art: any;
};
// Art & {media?:UploadedFile[], authors?:string[], categories?:string[]}
const EditForm: React.FC<UploadFormProps> = ({ userId, art }) => {
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
        defaultValues: {
          title: art.title,
          subtitle: art.subtitle,
        }
    });

    const handleMediaChange = (newMedia: UploadedFile[]) => {
        setMedia(newMedia);
    }

    useEffect(() => {
        console.log("media updated:", media)
    }, [media])

    const onSubmit: SubmitHandler<Art & {media?:UploadedFile[], authors?:string[], categories?:string[]}> = async (data) => {
        setIsSubmitting(true);

        data.uploader_id = userId;
        data.long_text = JSON.stringify(editorContent);
        data.media = media;
        data.authors = authors;
        data.categories = categories;
        console.log("DATA TO BE UPLOADED", data);
        let uploadedArt;
        try {
            uploadedArt = {updatedArt: {slug: "test"}};
            // uploadedArt = await updateArt({artId: art.id, data: JSON.parse(JSON.stringify(data))}); // FIXME:
            console.log("uploaded art from form:", uploadedArt)
        } catch (error) {
            console.error("Error uploading art", error)
        }

        if(uploadedArt?.updatedArt?.slug) {
            setIsSubmitting(false);
            setSubmitted(uploadedArt.updatedArt.slug);
            // redirect(`/offerings/${uploadedArt.updatedArt.slug}`)
        }
        
    }

    // const [errorMessage, dispatch] = useFormState(onSubmit, undefined);

    type InputProps = {
        name: keyof (Art & {media?:UploadedFile[], authors?:string[], categories?:string[]});
        label: string;
        placeholder: string;
        defaultVal: string | null;
        required?: boolean;
        description?: string;
        errorMessage?: string;
        type?: string;
    }
    const WatchedInput = ({name, label, placeholder, defaultVal, required = false, description, errorMessage, type = "text"}: InputProps) => {
        return (
            <label className="form-control w-full">
                <div className="label pb-1">
                    <span className="label-text title-txt">{label}</span>
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
                    defaultValue={defaultVal || ""}
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
            <pre className="max-w-64 max-h-32 overflow-scroll text-xs">{JSON.stringify(watch, null, 2)}</pre>
            <h1>Upload Work</h1>

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                encType="multipart/form-data" 
                className="flex flex-col gap-4"
            >
                <WatchedInput name="title" label="Title" required placeholder="Title" defaultVal={art.title} />

                <WatchedInput name="subtitle" label="Subtitle" placeholder="Subtitle" defaultVal={art.subtitle} />

                {/* <WatchedInput name="date" label="date" type="date" placeholder="date" defaultVal={art.date?.toString() || ""} /> */}

                {/* <CategoriesSelect selectedCategories={categories} setSelectedCategories={setCategories} /> */}

                {/* <Authorship userId={userId} authors={authors} setAuthors={setAuthors} /> */}

                {/* TODO: URL Vidéo */}

                <label className="form-control">
                    <div className="label pb-1">
                        <span className="label-text title-txt">Content</span>
                    </div>
                    <Tiptap setContent={setEditorContent} initialContent={art.long_text} />
                </label>

                <UploadFiles userId={userId} media={media} setMedia={setMedia}  />

                {/* <div className="form-control w-full">
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

                </div> */}

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
            <button className='btn btn-secondary btn-outline hover:btn-primary' onClick={() => console.log("data", watch())}>Watch</button>

        </div>
    )
}

function UploadButton({ pending } : {pending: boolean}) {
    // const { pending } = useFormStatus();
 
    return (
        <button className={`btn btn-outline hover:btn-primary mt-4 w-full`} disabled={pending} aria-disabled={pending}>
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


export default EditForm;
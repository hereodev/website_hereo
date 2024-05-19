"use client"

import { useState } from 'react';
import UploadFiles from './upload-files';
import { UploadedFile } from '@/global';
import { Art } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useFormState, useFormStatus } from 'react-dom';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import SubmitButton from '@/app/_components/submit-button';
import Tiptap from './tiptap3';

const UploadForm = ({userId} : {userId: string}) => {
    const [media, setMedia] = useState<UploadedFile[]>([]);
    const [editorContent, setEditorContent] = useState<string>('')
    const handleContentChange = (reason: any) => {
        setEditorContent(reason)
    }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { 
        register, 
        formState: { errors },
        handleSubmit, 
        watch 
    } = useForm<Art & {authors: any, media?:UploadedFile[]}>({
        // defaultValues: {
        //   title: art?.title || "",
        //   subtitle: art?.subtitle || "",
        // }
    });

    const onSubmit: SubmitHandler<Art & {media?:UploadedFile[], authors?:string[]}> = (data) => {
        setIsSubmitting(true);
        // console.log("data", data);
        // setTimeout(() => {
        //     setIsSubmitting(false);
        // }, 3000);

        data.uploader_id = userId;
        data.long_text = JSON.stringify(editorContent);
        data.media = media || [];
        // data.authors = selectedAuthors.map((author) => author.id);
        console.log("DATA TO BE UPLOADED", data);
        
        setIsSubmitting(false);
    }

    // const [errorMessage, dispatch] = useFormState(onSubmit, undefined);

    type InputProps = {
        name: keyof (Art & {media?:UploadedFile[], authors?:string[]});
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
                    <span className="label-text text-xl font-semibold">{label}</span>
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
            <h1>Upload Form</h1>

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                encType="multipart/form-data" 
                className="flex flex-col gap-4"
            >
                <WatchedInput name="title" label="Title" required placeholder="Title" />

                <WatchedInput name="subtitle" label="Subtitle" placeholder="Subtitle" />

                <label className="form-control">
                    <div className="label pb-1">
                        <span className="label-text text-xl font-semibold">Content</span>
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </div>
                    {/* <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea> */}
                    <Tiptap setContent={setEditorContent} />
                </label>
                {/* <p>{editorContent}</p> */}

                <UploadFiles userId={userId} media={media} setMedia={setMedia}  />

                <UploadButton pending={isSubmitting} />
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
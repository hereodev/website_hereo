'use client'

import { useEffect, useState } from "react";
import { FiAlertCircle, FiMail, FiArrowRight } from "react-icons/fi"
import { useFormState, useFormStatus } from 'react-dom';
import { resetPassword } from "@/app/lib/reset-password";

export default function FormReset({ handleSignUp } : { handleSignUp?: (formData: FormData) => void}) {
    const [errorMessage, dispatch] = useFormState(async (state: any, formData: FormData) => {
        const email = formData.get('email');
        if (email && typeof email === 'string') {
            return resetPassword({ email });
        }
        console.error('Invalid payload');
        console.log(`email: ${email}`);	    
        return { error: "Invalid payload" };
    }, undefined);

    // useEffect(() => {
    //     console.log('error message:', errorMessage);
    // }, [errorMessage]);
    return (
        <form action={dispatch} className="flex flex-col gap-2 w-full">
        {/* <form action={handleSignUp}> */}

             <label className="input input-bordered flex items-center gap-2">
                <FiMail className="w-4 h-4 opacity-70" />
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="grow" 
                    placeholder="Email" 
                />
             </label>
             {/* <label className="input input-bordered flex items-center gap-2">
                 <FiUser className="w-4 h-4 opacity-70" />
                 <input type="text" className="grow" placeholder="Name" />
             </label>
             <label className="input input-bordered flex items-center gap-2">
                <FiKey className="w-4 h-4 opacity-70" />
                <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    className="grow"
                    placeholder="password"
                    defaultValue={'password'}
                    // onChange={handlePasswordChange}
                />
                <span
                    // className="w-4 h-4 opacity-70"
                    onClick={() => setPasswordVisible((prevVisible) => !prevVisible)}
                >
                    {passwordVisible ? <FiEyeOff className="w-4 h-4 opacity-70" /> : <FiEye className="w-4 h-4 opacity-70" />}
                </span>
            </label>  */}
            {/* TODO: type password twice? */}
            
            {/* <button className="btn btn-secondary">Sign Up</button> */}
            <ResetButton />
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && errorMessage.error && (
                    <div className="flex flex-row items-center gap-2 ">
                        <FiAlertCircle className="h-5 w-5 text-error" />
                        <p className="text-sm text-error">{errorMessage.error}</p>
                    </div>
                )}
                {errorMessage && errorMessage.success && (
                    <div className="flex flex-row items-center gap-2 ">
                        <FiMail className="h-5 w-5 text-success" />
                        <p className="text-sm text-success">{errorMessage.success} Check out your inbox, including your spam folder.</p>
                    </div>
                )}
            </div>

        </form>
    )
}

function ResetButton() {
    const { pending } = useFormStatus();
 
    return (
        <button type="submit" className="btn btn-outline hover:btn-primary my-4 w-full" aria-disabled={pending}>
            {
                pending ?
                <span>Sending you an email...</span>
                :
                <span className="w-full flex justify-between items-center">Send me an email{' '}<FiArrowRight className="h-5 w-5 " /></span>
            }
        </button>
    );
}
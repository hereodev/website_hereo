'use client'

import { useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff, FiKey, FiMail, FiUser, FiArrowRight } from "react-icons/fi"
import { useFormState, useFormStatus } from 'react-dom';
// import { authenticate } from '@/app/lib/actions_auth';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from "next/link";
import SubmitButton from "../submit-button";
import { newPassword } from "@/app/lib/actions_auth";



export default function FormNewPassword() {
// export default function FormNewPassword({ handleSignIn } : { handleSignIn: (formData: FormData) => void}) {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [formState, dispatch] = useFormState(async (state: any, formData: FormData) => {
        const payload = formData.get('password') as string;
        if (!payload) return state;
        const result = await newPassword(payload, token);
        return result;
    }, { error: '', success: 'Your password has been reset successfully.' });

    const errorMessage = formState?.error;

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [password, setPassword] = useState('');
    const [hasTypedPassword, setHasTypedPassword] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasTypedPassword(true);
        setPassword(event.target.value);
    };

    // const searchParams = useSearchParams()
    // const justSignedUp = searchParams.get('signedup')
    return (
        // <form action={handleSignIn}>
        <Suspense>

        <form action={dispatch} className="flex flex-col gap-2 w-full">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* <Suspense>
              {justSignedUp && (
                <>
                  <FiAlertCircle className="h-5 w-5 text-info-content" />
                  <p className="text-sm text-info-content">Thank you for signing up. You can now sign in.</p>
                </>
              )}
          </Suspense> */}
        </div>
             <label className="input input-bordered flex items-center gap-2">
                <FiKey className="w-4 h-4 opacity-70" />
                <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    className="grow"
                    value={password}
                    onChange={handlePasswordChange}
                    onClick={() => {
                        if (!hasTypedPassword) {
                            setPassword('');
                            setHasTypedPassword(true);
                        }
                    }}
                    onInput={() => setHasTypedPassword(true)}
                />
                <span
                    className=""
                    onClick={() => setPasswordVisible((prevVisible) => !prevVisible)}
                >
                    {passwordVisible ? <FiEyeOff className="w-4 h-4 opacity-70" /> : <FiEye className="w-4 h-4 opacity-70" />}
                </span>
            </label> 

            
            {/* <button className="btn btn-secondary">Sign In</button> */}
            <NewPasswordButton />
            {/* <SubmitButton pending={useFormStatus()} submitMessage="Sign In" submittingMessage="Signing in..." color="primary" /> */}

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
        </Suspense>
    )
}


function NewPasswordButton() {
    const { pending } = useFormStatus();
 
    return (
        <button className="btn btn-outline hover:btn-primary mt-4 w-full" aria-disabled={pending}>
            {
                pending ?
                <span>Changing password...</span>
                :
                <span className="w-full flex justify-between items-center">Change Password <FiArrowRight className="h-5 w-5" /></span>
            }
        </button>
    );
}

'use client'

import { useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff, FiKey, FiMail, FiUser, FiArrowRight } from "react-icons/fi"
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions_auth';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import SubmitButton from "../submit-button";


export default function FormSignIn() {
// export default function FormSignIn({ handleSignIn } : { handleSignIn: (formData: FormData) => void}) {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

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
        <form action={dispatch}>
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
                {/* <FiMail className="w-4 h-4 opacity-70" /> */}
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="grow" 
                    placeholder="Email"
                    // defaultValue={justSignedUp || ""}
                />
             </label>
             {/* <label className="input input-bordered flex items-center gap-2">
                 <FiUser className="w-4 h-4 opacity-70" />
                 <input type="text" className="grow" placeholder="Name" />
             </label> */}
             <label className="input input-bordered flex items-center gap-2">
                {/* <FiKey className="w-4 h-4 opacity-70" /> */}
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
            <LoginButton />
            {/* <SubmitButton pending={useFormStatus()} submitMessage="Sign In" submittingMessage="Signing in..." color="primary" /> */}

            <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
            >
            {errorMessage && (
                <>
                <FiAlertCircle className="h-5 w-5 text-error" />
                <p className="text-sm text-error">{errorMessage}</p>
                </>
            )}
            </div>

        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus();
 
    return (
        <button className="btn btn-primary mt-4 w-full" aria-disabled={pending}>
            {
                pending ?
                <span>Logging in...</span>
                :
                <span className="w-full flex justify-between items-center">Log In <FiArrowRight className="h-5 w-5" /></span>
            }
        </button>
    );
}

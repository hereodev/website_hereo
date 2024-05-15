'use client'

import { useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff, FiKey, FiMail, FiUser, FiArrowRight } from "react-icons/fi"
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation'


export default function FormSignIn() {
// export default function FormSignIn({ handleSignIn } : { handleSignIn: (formData: FormData) => void}) {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [password, setPassword] = useState('password');
    const [hasTypedPassword, setHasTypedPassword] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const searchParams = useSearchParams()
    const justSignedUp = searchParams.get('signedup')
    return (
        // <form action={handleSignIn}>
        <form action={dispatch}>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {justSignedUp && (
            <>
              <FiAlertCircle className="h-5 w-5 text-info-content" />
              <p className="text-sm text-info-content">Thank you for signing up. You can now sign in.</p>
            </>
          )}
        </div>

             <label className="input input-bordered flex items-center gap-2">
                {/* <FiMail className="w-4 h-4 opacity-70" /> */}
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="grow" 
                    placeholder="Email"
                    defaultValue={justSignedUp || ""}
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
        <button className="btn btn-secondary mt-4 w-full" aria-disabled={pending}>
            {
                pending ?
                <span>Logging in...</span>
                :
                <span>Log In <FiArrowRight className="ml-auto h-5 w-5 text-gray-50" /></span>
            }
        </button>
    );
}

'use client'

import { useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff, FiKey, FiMail, FiUser, FiArrowRight } from "react-icons/fi"
import { addUser } from "@/app/lib/actions";
import { useFormState, useFormStatus } from 'react-dom';

export default function FormSignUp({ handleSignUp } : { handleSignUp?: (formData: FormData) => void}) {
    const [errorMessage, dispatch] = useFormState(addUser, undefined);

    const [passwordVisible, setPasswordVisible] = useState(false);

    // const [password, setPassword] = useState('password');

    // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(event.target.value);
    // };

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
             <label className="input input-bordered flex items-center gap-2">
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
            </label> 
            {/* TODO: type password twice? */}
            
            {/* <button className="btn btn-secondary">Sign Up</button> */}
            <SignUpButton />
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <FiAlertCircle className="h-5 w-5 text-error" />
                        <p className="text-sm text-error">{String(errorMessage)}</p>
                    </>
                )}
            </div>

        </form>
    )
}

function SignUpButton() {
    const { pending } = useFormStatus();

    // if(pending) {
    //     return (
    //         <button className="btn btn-secondary mt-4 w-full" aria-disabled={true}>
    //             <span>Signing you up...</span>
    //         </button>
    //     );
    // } else {
    //     return (
    //         <button className="btn btn-secondary mt-4 w-full" aria-disabled={false}>
    //             <span>Sign Up <FiArrowRight className="ml-auto h-5 w-5 text-gray-50" /></span>
    //         </button>
    //     );
    // }
 
    return (
        // pending ?
        // <button className="btn btn-secondary mt-4 w-full" aria-disabled={true}>
        //     <span>Signing you up...</span>
        // </button>
        // :
        // <button className="btn btn-secondary mt-4 w-full" aria-disabled={false}>
        //     <span>Sign Up <FiArrowRight className="ml-auto h-5 w-5 text-gray-50" /></span>
        // </button>
        <button type="submit" className="btn btn-primary mt-4 w-full" aria-disabled={pending}>
            {
                pending ?
                <span>Signing you up...</span>
                :
                <span className="w-full flex justify-between items-center">Sign Up{' '}<FiArrowRight className="h-5 w-5 " /></span>
            }
        </button>
    );
}
'use client'

import { useState } from "react";
import { FiEye, FiEyeOff, FiKey, FiMail, FiUser } from "react-icons/fi"

 
export default function FormSignIn({ handleSignIn }: { handleSignIn: any }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('password');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        // if (onPasswordChange) {
        //     onPasswordChange(event); // Pass the entire event object
        // }
    };

    return (
        <form action={handleSignIn}>
             <label className="input input-bordered flex items-center gap-2">
                 <FiMail className="w-4 h-4 opacity-70" />
                 <input type="text" className="grow" placeholder="Email" />
             </label>
             <label className="input input-bordered flex items-center gap-2">
                 <FiUser className="w-4 h-4 opacity-70" />
                 <input type="text" className="grow" placeholder="Username" />
             </label>
             <label className="input input-bordered flex items-center gap-2">
                <FiKey className="w-4 h-4 opacity-70" />
                <input
                    id="password-input"
                    type={passwordVisible ? 'text' : 'password'}
                    className="grow"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <span
                    className=""
                    onClick={() => setPasswordVisible((prevVisible) => !prevVisible)}
                >
                    {passwordVisible ? <FiEyeOff className="w-4 h-4 opacity-70" /> : <FiEye className="w-4 h-4 opacity-70" />}
                </span>
            </label> 
            
            <button className="btn btn-secondary">Sign In</button>

        </form>
    )
}
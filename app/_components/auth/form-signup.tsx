'use client'

import { useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff, FiKey, FiMail, FiUser, FiArrowRight } from "react-icons/fi"
 
export default function FormSignUp({ handleSignUp } : { handleSignUp: (formData: FormData) => void}) {

    const [passwordVisible, setPasswordVisible] = useState(true);
    // const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('password');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <form action={handleSignUp}>
             <label className="input input-bordered flex items-center gap-2">
                {/* <FiMail className="w-4 h-4 opacity-70" /> */}
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
                {/* <FiKey className="w-4 h-4 opacity-70" /> */}
                <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    className="grow"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <span
                    className=""
                    onClick={() => setPasswordVisible((prevVisible) => !prevVisible)}
                >
                    {/* {passwordVisible ? <FiEyeOff className="w-4 h-4 opacity-70" /> : <FiEye className="w-4 h-4 opacity-70" />} */}
                </span>
            </label> 
            
            <button className="btn btn-secondary">Sign Up</button>
            {/* <LoginButton /> */}


        </form>
    )
}


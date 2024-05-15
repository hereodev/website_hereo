"use client";

import { useState, useEffect } from 'react';

import { FiEye, FiKey, FiEyeOff } from 'react-icons/fi';

export const PasswordInput = ({ onPasswordChange }: { onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('password');

    // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(event.target.value);
    // };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (onPasswordChange) {
            onPasswordChange(event); // Pass the entire event object
        }
    };
    
    return (
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
    );
}
"use client"
import React, { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FiCheckCircle } from 'react-icons/fi';

interface DebouncedInputProps {
    label: string;
    type?: 'text' | 'email' | 'password';
    defaultValue?: string;
    onSave: (value: string) => Promise<boolean>; // Function to save the input, returns true if successful
    debounceDelay?: number; // Optional debounce delay in ms, defaults to 1000
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
    label,
    type = 'text',
    defaultValue = '',
    onSave,
    debounceDelay = 1000,
}) => {
    const [value, setValue] = useState(defaultValue);
    const [isSaving, setIsSaving] = useState(false); // Tracks if save is successful
    const [showSuccess, setShowSuccess] = useState(false); // Tracks success feedback

    const debouncedSave = useDebouncedCallback(async (newValue: string) => {
        setIsSaving(true);
        const success = await onSave(newValue);
        setIsSaving(false);
        if (success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); // Reset success feedback after 3 seconds
        }
    }, debounceDelay);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        debouncedSave(e.target.value); // Trigger debounced save
    };

    return (
        <div className="label w-full">
            <label className="form-control w-full max-w-xs">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                    showSuccess ? 'border-success text-success' : ''
                }`}
            />
            {showSuccess && <div className="text-success"><FiCheckCircle /></div>}
            {isSaving && <div className="text-primary">Saving...</div>}
        </div>
    );
};

export default DebouncedInput;

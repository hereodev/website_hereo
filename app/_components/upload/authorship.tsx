"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { getUserName } from "@/app/lib/actions_db";
import { FiCheckCircle } from "react-icons/fi";

export default function Authorship( {userId, authors, setAuthors} : { userId : string, authors: string[], setAuthors: (authors: string[]) => void}) {
    const [name, setName] = useState("");
    const [changedName, setChangedName] = useState(false);
    const [isMeChecked, setIsMeChecked] = useState(false);
    const [isOthersChecked, setIsOthersChecked] = useState(false);
    const [validateName, setValidateName] = useState(false);
    useEffect(() => {
        if(changedName) {
            setValidateName(true)
            setTimeout(() => {
                setChangedName(false);
            }, 3000);
            setTimeout(() => {
                setValidateName(false);
            }, 300);
        }
    }, [changedName]);


    useEffect(() => {
        async function fetchUser() {
            const name = await getUserName({userId});
            if(name) setName(name);
        }
        fetchUser();
        // if(user) setName(user.name);
    }, [userId]);

    const handleNameChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        // setName(e.target.value);
        // console.log("changing name to", e.target.value);
        // console.log("userId", userId)
        if(userId) { 
            const userUpdated = await fetch(`/api/user?userId=${userId}&name=${e.target.value}`, {
                method: 'PUT',
            });

            // const userUpdated = await changeName(userId, e.target.value); 
            // console.log("userUpdated", userUpdated)
            if(userUpdated.ok) {
                console.log("name changed successfully")
                setChangedName(true);
            } else {
                console.error("error changing name")
            }
        }
    }, 1000);

    return (
        <label className="form-control w-full">
            <div className="label pb-1">
                <span className="label-text text-xl font-semibold">Author(s)</span>
                    <span className="label-text-alt text-error text-sm opacity-80">required*</span>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center h-12 gap-2">
                    <input 
                        type="checkbox" 
                        name="chbx-me" 
                        className="checkbox" 
                        placeholder="Please enter your name"
                        onChange={(e) => setIsMeChecked(e.target.checked)}
                    />                    
                    <span>Me</span>
                    {isMeChecked && (
                        <input 
                            type="text" 
                            id="name"
                            defaultValue={name}
                            onChange={handleNameChange}
                            className={"input input-bordered " + (validateName ? "border-success text-success" : "")}
                        />
                    )}
                    {
                        changedName && <div className="text-success"><FiCheckCircle /></div>
                    }

                </div>
                <div className="flex flex-row items-center h-12 gap-2">
                    <input 
                        type="checkbox" 
                        name="chbx-others" 
                        className="checkbox" 
                        onChange={(e) => setIsOthersChecked(e.target.checked)}
                    />                    
                    <span>And/Or other Author(s)</span>
                </div>
            </div>

        </label>
    )
}

"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { changeName, changeEmail, myAction } from '@/app/lib/actions_auth';
import { useDebouncedCallback } from 'use-debounce';
import { FiCheck, FiCheckCircle } from 'react-icons/fi';
import { Media } from '@prisma/client';

interface EditableProfileProps {
    userId?: string | null | undefined;
    initialName?: string | null | undefined;
    initialEmail?: string | null | undefined;
    initialSites?: string[] | null | undefined;
    initialMedia?: Media[] | null | undefined;
}

const EditableProfile: React.FC<EditableProfileProps> = ({ userId, initialName, initialEmail, initialSites, initialMedia }) => {
        
    const [name, setName] = useState(initialName || "");
    const [email, setEmail] = useState(initialEmail || "");
    const [password, setPassword] = useState('');
    const [changedName, setChangedName] = useState(false);
    const [validateName, setValidateName] = useState(false);
    const [site1, setSite1] = useState(initialSites && initialSites[0] || "");
    const [site2, setSite2] = useState(initialSites && initialSites[1] || "");
    const [site3, setSite3] = useState(initialSites && initialSites[2] || "");
    const [changedSite, setChangedSite] = useState(false);
    const [validateSite, setValidateSite] = useState(false);
    const [changedEmail, setChangedEmail] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);

    // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setName(e.target.value);
    // };

    // FIXME: should update name from DB. not the case yet. see if can update in session right away? or dont inlude name in session, but fetch from DB.

    // useeffect when changedname becomes true, then after 3 seconds, set it back to false.
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

    // TODO: change name when types.
    // TODO: display success when changed.

    const handleNameChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        // setName(e.target.value);
        console.log("changing name to", e.target.value);
        console.log("userId", userId)
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


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // TODO: send email to new adress.
    const handleSiteChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const siteNumber = e.target.id.charAt(4);
        const newSiteValue = e.target.value;

        if (siteNumber === '1') setSite1(newSiteValue);
        if (siteNumber === '2') setSite2(newSiteValue);
        if (siteNumber === '3') setSite3(newSiteValue);

        if (userId) {
            const userUpdated = await fetch(`/api/user?userId=${userId}&site${siteNumber}=${newSiteValue}`, {
                method: 'PUT',
            });

            if (userUpdated.ok) {
                console.log("site changed successfully");
                setChangedSite(true);
            } else {
                console.error("error changing site");
            }
        }
    }, 1000);  

    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        // <div>
            <div >
                <div className="label w-full">
                    <label htmlFor="name" className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text">Name</span></div>
                    </label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={name}
                        onChange={handleNameChange}
                        className={"input input-bordered w-full " + (validateName ? "border-success text-success" : "")}
                    />
                    {
                        changedName && <div className="text-success"><FiCheckCircle /></div>
                    }
                </div>
                <div className="label w-full">
                    <label htmlFor="email" className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text">Email</span></div>
                    </label>
                    <input
                        type="email"
                        id="email"
                        defaultValue={email}
                        onChange={handleEmailChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <h2>Sites of belonging</h2>
                <p>You can enter up to 3 sites of belonging.</p>
                <p>Make sure you entered a name above for your sites of belonging to be saved.</p>
                <div className="label w-full">
                    <label htmlFor="site1" className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text">Site n°1</span></div>
                    </label>
                    <input
                        type="text"
                        id="site1"
                        defaultValue={initialSites && initialSites[0] || ""}
                        onChange={handleSiteChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="label w-full">
                    <label htmlFor="site2" className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text">Site n°2</span></div>
                    </label>
                    <input
                        type="text"
                        id="site2"
                        defaultValue={initialSites && initialSites[1] || ""}
                        onChange={handleSiteChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="label w-full">
                    <label htmlFor="site3" className="form-control w-full max-w-xs">
                        <div className="label"><span className="label-text">Site n°3</span></div>
                    </label>
                    <input
                        type="text"
                        id="site3"
                        defaultValue={initialSites && initialSites[2] || ""}
                        onChange={handleSiteChange}
                        className="input input-bordered w-full"
                    />
                </div>
                {/* <div className="w-full">
                    <label htmlFor="password" className="form-control w-full max-w-xs">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="input input-bordered"
                    />
                </div> */}
                {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Change Password
                </button> */}

                
            </div>
        // </div>
    );
};

export default EditableProfile;

"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { changeName, changeEmail, myAction } from '@/app/lib/actions_auth';
import { useDebouncedCallback } from 'use-debounce';
import { FiCheck, FiCheckCircle } from 'react-icons/fi';
import { Media } from '@prisma/client';
import DebouncedInput from '../debounced-input';
import { updateSite, updateEmail, updateUsername } from '@/app/lib/actions_db';

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
    };
    const handleSiteChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        console.log(e.target.id.charAt(4));

        if (userId) {
            const siteNumber = e.target.id.charAt(4);
            const userUpdated = await fetch(`/api/user?userId=${userId}&site${siteNumber}=${e.target.value}`, {
                method: 'PUT',
            });

            if (userUpdated.ok) {
                console.log("site changed successfully");
                setChangedName(true);
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

    if(userId) {
    return (
        // <div>
            <div >

                <DebouncedInput
                    label="Name"
                    defaultValue={initialName || ""}
                    onSave={async (newValue) => {
                        // const userUpdated = await fetch(`/api/user?userId=${userId}&name=${newValue}`, { method: 'PUT' });
                        // return userUpdated.ok;
                        const userUpdated = await updateUsername({userId, newUsername:newValue});
                        return userUpdated.ok;
                    }}
                />
                <DebouncedInput
                    label="Email"
                    type="email"
                    defaultValue={initialEmail || ""}
                    onSave={async (newValue) => {
                        // const userUpdated = await fetch(`/api/user?userId=${userId}&email=${newValue}`, { method: 'PUT' });
                        // return userUpdated.ok;
                        const userUpdated = await updateEmail({userId, newEmail:newValue});
                        return userUpdated.ok;
                    }}
                />

                <h2>Sites of belonging</h2>
                <p>You can enter up to 3 sites of belonging.</p>
                <p>Make sure you entered a name above for your sites of belonging to be saved.</p>
                {
                    [1,2,3].map((siteNum) => {
                        return (
                            <DebouncedInput key="siteNum"
                                label={`Site n°${siteNum}`}
                                defaultValue={initialSites && initialSites[siteNum-1] || ""}
                                onSave={async (newValue) => {
                                    // const userUpdated = await fetch(`/api/user?userId=${userId}&site${siteNum}=${newValue}`, { method: 'PUT' });
                                    // return userUpdated.ok;
                                    const siteUpdated = await updateSite({userId, newSite:newValue, siteNum:siteNum.toString()});
                                    return siteUpdated.ok;
                                }}
                            />
                        )
                    })
                }

                
            </div>
        // </div>
    );} else {
        return <div>loading...</div>
    }
};

export default EditableProfile;
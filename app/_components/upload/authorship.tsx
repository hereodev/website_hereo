"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { connectUserToAuthor, getAllAuthors, getUserName } from "@/app/lib/actions_db";
import { FiCheckCircle, FiCrosshair, FiX } from "react-icons/fi";
import { Author } from "@prisma/client";

export default function Authorship( {userId, authors, setAuthors} : { userId : string, authors: string[], setAuthors: (authors: string[]) => void}) {
    const [name, setName] = useState("");
    const [changedName, setChangedName] = useState(false);
    const [isMeChecked, setIsMeChecked] = useState(false);
    const [isOthersChecked, setIsOthersChecked] = useState(false);
    const [validateName, setValidateName] = useState(false);
    const [allAuthors, setAllAuthors] = useState<Author[]>([]);
    const [searchedAuthor, setSearchedAuthor] = useState<string>("");

    useEffect(() => {
        if(changedName) {
            setValidateName(true)
            connectUserToAuthor({userId, authorName: name});
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

    useEffect(() => {
        async function fetchAuthors() {
            const fetchedAuthors = await getAllAuthors();
            if(fetchedAuthors) setAllAuthors(fetchedAuthors);
        }
        fetchAuthors();
        // if(user) setName(user.name);
    }, []);

    const handleNameChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        // setName(e.target.value);
        // console.log("changing name to", e.target.value);
        // console.log("userId", userId)
        const newName = e.target.value.trim();
        if(userId) { 
            const userUpdated = await fetch(`/api/user?userId=${userId}&name=${newName}`, {
                method: 'PUT',
            });

            // const userUpdated = await changeName(userId, e.target.value); 
            // console.log("userUpdated", userUpdated)
            if(userUpdated.ok) {
                console.log("name changed successfully")
                setChangedName(true);
                if(!authors.includes(newName)) {
                    setAuthors([...authors, newName])
                }
            } else {
                console.error("error changing name")
            }
        }
    }, 1000);

    return (
        <div className="form-control w-full">
            <div className="label pb-1">
                <span className="label-text text-xl font-semibold">Author(s)</span>
                    <span className="label-text-alt text-error text-sm opacity-80">required*</span>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center h-12 gap-2">
                    <label className="flex flex-row items-center h-12 gap-2">
                        <input 
                            type="checkbox" 
                            name="chbx-me" 
                            className="checkbox" 
                            placeholder="Please enter your name"
                            onChange={(e) => {
                                setIsMeChecked(e.target.checked)
                                if(e.target.checked && name.length > 0 && !authors.includes(name)) {
                                    setAuthors([...authors, name])
                                } else if(!e.target.checked) {
                                    setAuthors(authors.filter((a) => a !== name))
                                }
                            }}
                        />                    
                        Me{isMeChecked && ":"}
                    </label>
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
                <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center h-12 gap-2">
                        <input 
                            type="checkbox" 
                            name="chbx-others" 
                            className="checkbox" 
                            onChange={(e) => setIsOthersChecked(e.target.checked)}
                        />
                        And/Or other Author(s){isOthersChecked && ":"}
                    </label>
                    {
                        isOthersChecked && (
                            <input 
                                type="text" 
                                id="name"
                                placeholder="Search for author or add new one"
                                onChange={(e) => setSearchedAuthor(e.target.value)}
                                className={"input input-sm input-bordered italic " + (validateName ? "border-success text-success" : "")}
                            />
                        )
                    }
                    {isOthersChecked && searchedAuthor.length >= 2 &&
                        // <OtherAuthors authors={authors} setAuthors={setAuthors} allAuthors={allAuthors} />
                        <div className="flex flex-col max-h-24 overflow-y-scroll">
                        {
                        allAuthors.filter(
                            (author) => {
                                // if(searchedAuthor.length >= 2) {
                                    return author.name.toLowerCase().includes(searchedAuthor.toLowerCase());
                                // } else {
                                    // return true;
                                // }
                            }
                        ).map((author, index) => {
                            // a select with multiple options, with a least of all authors
                            return (
                                <div key={index} className="flex flex-row items-center gap-2 group hover:cursor-pointer">
                                    <label className={`group-hover:underline ${authors.includes(author.name) ? "font-semibold" : ""}`}>
                                    <input 
                                        type="checkbox" 
                                        name={`chbx-${author.name}`} 
                                        className={`opacity-0 invisible w-0 `} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                // console.log("checking", author.name)
                                                setAuthors([...authors, author.name])
                                            } else {
                                                // console.log("unchecking", author.name)
                                                setAuthors(authors.filter((a) => a !== author.name))
                                            }
                                        }}
                                    />
                                        {author.name}
                                    </label>
                                </div>
                            )
                        })
                    }
                    </div>
                    }
                    { isOthersChecked &&
                        // remove "me.name" from authors if me is checked, map the rest
                        <div className="flex flex-row flex-wrap gap-2">
                            {
                                authors.filter((author) => author !== name).map((author, index) => {
                                    return (
                                        <div key={index} 
                                        className="group hover:cursor-pointer badge badge-secondary gap-2"
                                        onClick={(e) => setAuthors(authors.filter((a) => a !== author))}
                                        >
                                            {author}
                                            <FiX className="font-bold group-hover:stroke-[5px]" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}



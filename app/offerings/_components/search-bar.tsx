"use client";

import { useDebouncedCallback } from "use-debounce";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
            setSearchTerm(term);
        } else {
            params.delete('query');
            setSearchTerm("");
        }
        replace(`${pathname}?${params.toString()}`);

        console.log(term);
    }, 300);

    return (
        <div className="search-bar w-full">
            <label className="input flex items-center gap-2 px-0">
                <FiSearch className="w-4 h-4 opacity-70" />
                <input
                    type="text" 
                    // disabled
                    className="grow"
                    placeholder="I've seen the future..."
                    defaultValue={searchParams.get('query')?.toString()}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
                {
                    searchParams.get('query') &&
                    <FiX onClick={() => {
                        setSearchTerm("");
                        const params = new URLSearchParams(searchParams);
                        params.delete("query");
                        replace(`${pathname}?${params.toString()}`);
                    }} className="w-4 h-4 opacity-70 hover:cursor-pointer" />
                }
            </label>
        </div>
    );
}
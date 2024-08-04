"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FaX } from "react-icons/fa6";

export default function QueriesTags() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    // const [searchTerm, setSearchTerm] = useState("");

    // const handleSearch = useDebouncedCallback((term) => {
    //     const params = new URLSearchParams(searchParams);
    //     if (term) {
    //         params.set('query', term);
    //         setSearchTerm(term);
    //     } else {
    //         params.delete('query');
    //         setSearchTerm("");
    //     }
    //     replace(`${pathname}?${params.toString()}`);

    //     console.log(term);
    // }, 300);

    const handleRemoveTag = (tag: string, type: string) => {
    }


    return (
        <div className="search-bar w-full">
            {/* <label className="input flex items-center gap-2 px-0">
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
            </label> */}
            {
                searchParams &&
                <div className="flex flex-col gap-2">

                    {searchParams && searchParams.get('keywords')?.toString() &&
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <p className="text-sm">Keywords:</p> 
                            <div className="flex flex-row flex-wrap gap-2">
                                {searchParams.get('keywords')?.toString().split(',').map((kw, i) => {
                                    return (
                                        <div key={i} className="badge badge-outline gap-2 group hover:cursor-pointer">
                                            {kw}
                                            <FaX className="text-xs group-hover:text-white" />
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    }
                    {/* Do the same for sites and authors */}
                    {searchParams && searchParams.get('authors')?.toString() &&
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <p className="text-sm">Authors:</p> 
                            <div className="flex flex-row flex-wrap gap-2">
                                {searchParams.get('authors')?.toString().split(',').map((kw, i) => {
                                    return (
                                        <div key={i} className="badge badge-outline gap-2 group hover:cursor-pointer">
                                            {kw}
                                            <FaX className="text-xs group-hover:text-white" />
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    }
                    {/* Do the same for sites and authors */}
                    {searchParams && searchParams.get('sites')?.toString() &&
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <p className="text-sm">Sites:</p> 
                            <div className="flex flex-row flex-wrap gap-2">
                                {searchParams.get('sites')?.toString().split(',').map((kw, i) => {
                                    return (
                                        <div key={i} className="badge badge-outline gap-2 group hover:cursor-pointer">
                                            {kw}
                                            <FaX className="text-xs group-hover:text-white" />
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    }
                </div>
            }

        </div>
    );
}
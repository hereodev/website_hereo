"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function OfferingsMenuItem({ 
    label, count, categories, searchParamsEntry, 
    // removefilter
}: { 
    label: string, 
    count: number,
    categories: string[],
    searchParamsEntry: string
    // removefilter: () => void
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace: routerReplace } = useRouter();

    // console.log("SERCHED?", searchParams.getAll(searchParamsEntry));

    const [chosenCategories, setChosenCategories] = useState(searchParams.getAll(searchParamsEntry) || []);
    const [isExtended, setIsExtended] = useState(false);

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set('query', term);
        } else {
          params.delete('query');
        }
        routerReplace(`${pathname}?${params.toString()}`);
    }


    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (chosenCategories.length > 0) {
            params.set(searchParamsEntry, chosenCategories.join(","));
        } else {
            params.delete(searchParamsEntry);
        }
        routerReplace(`${pathname}?${params.toString()}`);
    }, [chosenCategories]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (!params.has(searchParamsEntry)) {
            setChosenCategories([]);
        } else {
            setChosenCategories(params.getAll(searchParamsEntry));
        }
    }, [searchParams]);
    return (
        <div>
            {/* <p className="text-xs">{chosenCategories.join(', ')}</p> */}
            <div className="flex flex-row justify-between group hover:cursor-pointer hover:text-primary" onClick={() => setIsExtended(!isExtended)}>
                <p className="border-t border-t-white group-hover:font-semibold group-hover:border-t-primary">{label.toUpperCase()}</p>
                <p>
                    {count}
                    {
                        chosenCategories.length > 0 && 
                            <span className="text-primary text-sm"> | {chosenCategories.length}</span>
                    }
                </p>
            </div>
            {
                isExtended && 
                <div className="flex flex-col gap-2">
                    {
                        categories.sort((a, b) => a.localeCompare(b)).map((category) => {
                            // FIXME: if pre-checked categories, they should be checked. for now it doesnt work.
                            return (
                                <label key={category} className="flex items-center gap-2">
                                    <input 
                                        type="checkbox" 
                                        className="opacity-0 w-2"
                                        checked={chosenCategories.map(c => c.toLowerCase().trim()).includes(category.toLowerCase().trim())}
                                        // || searchParams.getAll(searchParamsEntry).map(c => c.toLowerCase().trim()).includes(category.toLowerCase().trim())
                                        onChange={(event) => {
                                            if(event.target.checked) {
                                                setChosenCategories([...chosenCategories, category])
                                            } else {
                                                setChosenCategories(chosenCategories.filter((c) => c !== category))
                                            }
                                        }}
                                    />
                                    <span className={`hover:text-primary hover:cursor-pointer ${ chosenCategories.includes(category) && "font-extrabold text-primary" }`}>{category}</span>
                                </label>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}
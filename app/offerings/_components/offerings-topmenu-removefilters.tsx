"use client";


import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaX } from 'react-icons/fa6';


export default function OfferingsMenuRemovefilters() {
// export default function OfferingsMenuRemovefilters({removeFilter} : {removeFilter: () => void}) {
    const searchParams = useSearchParams();
    const [showRemoveFilter, setShowRemoveFilter] = useState(false);

    // a useEffect that will update state when searchParams change
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (Array.from(params.entries()).length > 0) {
            setShowRemoveFilter(true)
        } else {
            setShowRemoveFilter(false)
        }
    }, [searchParams])
    

    if(showRemoveFilter) {

        return (
            <button className="divider" >
                <Link href="/offerings" className="hover:cursor-pointer hover:font-bold badge gap-2 group/quad">
                <FaX className="h-2 w-2 group-hover/quad:text-primary"></FaX>
                <span>remove all filters</span>
                </Link>
            </button>
        )

    } else {
        return null
    }

}
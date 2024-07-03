// "use client";
import Link from "next/link";
import { GoMegaphone } from "react-icons/go";
// import { useEffect } from "react";


export default function EventAlert() {
    return (
        <div role="alert" className="alert alert-info shadow-lg fixed bottom-4 mx-auto w-[98vw]">
            <GoMegaphone />
            {/* <span></span> */}
            <div>
            <h3 className="font-bold">Upcoming event!</h3>
            <div className="text-xs">July 21st, in Abidjan, Ivory Coast.</div>
            </div>
            <a href="https://maps.app.goo.gl/WouNKLzeFmWU1sVq6" target="_blank" rel="noopener noreferrer" className="btn btn-sm">See</a>
        </div>
    )
}
import { auth } from "@/auth"
import prisma from "@/prisma";
import { FiSearch, FiTriangle } from "react-icons/fi";
import SearchBar from "@/app/offerings/_components/search-bar";
import Link from "next/link";

export default async function Loading() {

    const emptyArray = new Array(20).fill(0);

    return (
        <main>
            <div className="w-full flex flex-row flex-nowrap items-center justify-between">
                <h1>Offerings</h1>
            <div className="divider my-0"><FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle></div> 
            </div>
            <div className="flex flex-row flex-wrap gap-6 justify-around">
                {
                    emptyArray.map((art, index) => {
                        return (
                            <div key={index} className="avatar">
                        <div className="w-64 h-64 rounded-full bg-slate-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {/* <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                                    alt="Placeholder missing picture"
                                    // className="w-full h-full rounded-xl object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                /> */}
                        </div>
                    </div>
                        )
                    })
                }
            </div>

        </main>
    )
}
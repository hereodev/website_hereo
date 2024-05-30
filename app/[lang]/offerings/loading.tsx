import { auth } from "@/auth"
import prisma from "@/prisma";
import { FiSearch, FiTriangle } from "react-icons/fi";
import SearchBar from "./_components/search-bar";
import Link from "next/link";

export default async function Loading() {

    return (
        <main>
            <div className="w-full flex flex-row flex-nowrap items-center justify-between">
                <h1>Offerings</h1>
            </div>
        <div className={` grid grid-cols-1 md:grid-cols-3 gap-4 px-1`}>
            <div className="flex flex-col w-full gap-2">
            <div className="search-bar w-full">
            <label className="input flex items-center gap-2 px-0">
                <FiSearch className="w-4 h-4 opacity-70" />
                <input
                    type="text" 
                    className="grow"
                    placeholder="I've seen the future..."
                />
            </label>
        </div>
                <div className="flex flex-row justify-between">
                    <p className="border-t border-t-white">PROMPTS</p>
                    <p>?</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="border-t border-t-white">PEOPLE</p>
                    <p>?</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="border-t border-t-white">SITES OF BELONGING</p>
                    <p>?</p>
                </div>
                <div className="divider my-0"><FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle></div> 
            </div>
            {
                [
                    {id: 1, title: "Loading..."},
                    {id: 2, title: "Loading..."},
                    {id: 3, title: "Loading..."},
                    {id: 4, title: "Loading..."},
                    {id: 5, title: "Loading..."},
                    {id: 6, title: "Loading..."},
                    {id: 7, title: "Loading..."},
                    {id: 8, title: "Loading..."},
                    {id: 9, title: "Loading..."},
                    {id: 10, title: "Loading..."},
                ].map((art) => {
                    return (
                        <div key={art.id} className="border border-dashed border-base-content min-h-24 p-4">
                            <h3 className="text-lg hover:underline">{art.title}</h3>
                        </div>
                    )
                })
            }
        </div>

        </main>
    )
}
import { auth } from "@/auth"
import prisma from "@/prisma";
import { FiTriangle } from "react-icons/fi";
import SearchBar from "./_components/search-bar";
import Link from "next/link";

export default async function Offerings() {
    const session = await auth();

    const allArt = await prisma.art.findMany({
        include: {
            associated_media: {
                include: {
                    Media: true
                }
            },
            uploader: true,
            authors: true,
        }
    })

    const allTags = await prisma.category.count()
    const allAuthors = await prisma.author.count()

    return (
        <main>
            <div className="w-full flex flex-row flex-nowrap items-center justify-between">
                <h1>Offerings</h1>
                {
                    session && session.user &&
                    <Link href="/offerings/upload" className={`${"btn btn-outline btn-primary"}`}>Upload Art</Link>
                }
            </div>
        <div className={` grid grid-cols-1 md:grid-cols-3 gap-4 px-1`}>
            <div className="flex flex-col w-full gap-2">
                <SearchBar />
                {/* <IndexSearchBar value={searchTerm} onChange={setSearchTerm} /> */}
                {/* TODO: tags  */}
                <div className="flex flex-row justify-between">
                    <p className="border-t border-t-white">PROMPTS</p>
                    <p>{allTags}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="border-t border-t-white">PEOPLE</p>
                    <p>{allAuthors}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="border-t border-t-white">SIGHTS</p>
                    <p>{allArt.length}</p>
                    {/* Choisir par lieux (régions) */}
                </div>
                <div className="divider my-0"><FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle></div> 
            </div>
            {
                allArt && allArt.map((art) => {
                    return (
                        <div key={art.id} className="border border-dashed border-base-content min-h-24 p-4">
                            <h3 className="text-lg hover:underline"><Link href={`/offerings/${art.slug}`}>{art.title}</Link></h3>
                            {/* <p className="text-lg">{art.subtitle}</p> */}
                        </div>
                    )
                })
            }
        </div>

        </main>
    )
}
import SearchBar from "./search-bar";
import prisma from "@/prisma";
import { FiTriangle } from "react-icons/fi";



export default async function OfferingsMenu() {
    let allArt: any[] = []
    let allTags = 0
    let allAuthors = 0


    try {
        allArt = await prisma.art.findMany({
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

        allTags = await prisma.category.count()
        allAuthors = await prisma.author.count()
    } catch (error) {
        console.error(error)
    }


    return (
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
            <p className="border-t border-t-white">SITES OF BELONGING</p>
            <p>{allArt.length}</p>
            {/* Choisir par lieux (régions) */}
        </div>
    </div>

    )
}
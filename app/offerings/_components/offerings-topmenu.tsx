import SearchBar from "./search-bar";
import prisma from "@/prisma";
import { FiTriangle } from "react-icons/fi";
import OfferingsMenuItem from "./offerings-menu-item";
import { Author, Category, Site } from "@prisma/client";


export default async function OfferingsTopMenu() {
    let allArt: any[] = []
    let allTags = 0
    let allAuthors: Author[] = [];
    let countAuthors = 0;

    let allCategories: Category[] = []

    let allSites: Site[] = []


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
        allAuthors = await prisma.author.findMany()
        allCategories = await prisma.category.findMany()
        allSites = await prisma.site.findMany()
        if(allAuthors) {
            countAuthors = allAuthors.length
        } else {
            allAuthors = []
        }
    } catch (error) {
        console.error(error)
    }


    return (
    <div className="flex flex-col w-full gap-2">
        <SearchBar />
        {/* <IndexSearchBar value={searchTerm} onChange={setSearchTerm} /> */}
        {/* TODO: tags  */}
        {/* <div className="collapse rounded-none ">
            <input type="checkbox" />
            <div className="collapse-title p-0 flex flex-row justify-between">
                <p className="border-t border-t-white">PROMPTS</p>
                <p className="">{allTags}</p>
            </div>
            <div className="collapse-content">
                <p>contenu 1</p>
                <p>prompt XYZ</p>
            </div>
        </div> */}
        <OfferingsMenuItem 
            label="PROMPTS" 
            count={allTags} 
            categories={allCategories && allCategories.map(c => c.name) || []} 
            searchParamsEntry="prompts" 
        />
        <OfferingsMenuItem 
            label="PEOPLE" 
            count={countAuthors} 
            categories={allAuthors && allAuthors.map(a => a.name) || []} 
            searchParamsEntry="authors" 
        />
        <OfferingsMenuItem 
            label="SITES OF BELONGING" 
            count={allSites.length} 
            categories={allSites && allSites.map(s => s.description) || []} 
            searchParamsEntry="sites"
        />
    </div>

    )
}
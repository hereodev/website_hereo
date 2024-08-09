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
                uploader: {
                    select: {
                        name: true,
                        email: true, role:true,
                    }
                },
                authors: true,
            }
        })

        allTags = await prisma.category.count()
        // allAuthors = await prisma.author.findMany()
        // allCategories = await prisma.category.findMany()
        // allSites = await prisma.site.findMany()
        // if(allAuthors) {
        //     countAuthors = allAuthors.length
        // } else {
        //     allAuthors = []
        // }
        allAuthors = await prisma.author.findMany({
            where: {
              Authorship: {
                some: {},
              },
            },
          });
          countAuthors = allAuthors.length;
          allCategories = await prisma.category.findMany();
          allSites = await prisma.site.findMany();
    } catch (error) {
        console.error(error)
    }


    return (
    <div className="collapse min-w-64 w-64 sm:w-full group/tri">
    <input type="checkbox" />
        <div className="collapse-content flex flex-col w-full gap-2">
            {/* <SearchBar /> */}
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
                label="KEYWORDS"
                count={allTags}
                categories={allCategories && allCategories.map(c => c.name) || []}
                searchParamsEntry="keywords"
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
                categories={allSites && allSites.map(s => s.text) || []}
                searchParamsEntry="sites"
            />
        </div>

    <div className="collapse-title p-0 m-0">
        <div className="divider my-2"><FiTriangle className="h-8 w-8 group-hover/tri:text-primary" style={{transform: "rotate(180deg)"}}></FiTriangle></div>
    </div>



    </div>

    )
}
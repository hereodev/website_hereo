import { auth } from "@/auth"
import prisma from "@/prisma";
import { FiTriangle } from "react-icons/fi";
import SearchBar from "@/app/offerings/_components/search-bar";
import Link from "next/link";
import OfferingsTopMenu from "@/app/offerings/_components/offerings-topmenu";
import { Art, UserRole } from "@prisma/client";
import OfferingPreview from "./_components/offering-preview";
import { ExtendedArt } from "@/global";
import { FaX } from "react-icons/fa6";


export default async function Offerings({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
      keywords?: string;
      authors?: string;
      sites?: string;
    };
  }) {
    const session = await auth();

    let allArt: ExtendedArt[] = []
    // let allArt: Art & {associated_media?: any[]}[] = []
    // let allTags = 0
    // let allAuthors = 0


    try {
        allArt = await prisma.art.findMany({
            include: {
                associated_media: {
                    include: {
                        Media: true
                    }
                },
                SubCategories: {
                    include: {
                        SubCategory: {
                            select: {
                                name: true,
                                Category: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },
                uploader: {
                    select: {
                        name: true,
                        email: true, role:true,
                    }
                },
                authors: {
                    include: {
                        author: {
                            include: {
                                associated_user: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                },
            }
        }) as ExtendedArt[]

        // allTags = await prisma.category.count()
        // allAuthors = await prisma.author.count()
    } catch (error) {
        console.error(error)
    }

    // allArt = await prisma.art.findMany({
    //     include: {
    //         associated_media: {
    //             include: {
    //                 Media: true
    //             }
    //         },
    //                     uploader: {
            //     select: {
            //         name: true,
            //         email: true, role:true,
            //     }
            // }
// ,
    //         authors: true,
    //     }
    // })

    // allTags = await prisma.category.count()
    // allAuthors = await prisma.author.count()
    const { keywords, sites, authors, query } = searchParams || {};

// Filter function
const filterArt = (art: ExtendedArt) => {
// const filterArt = (art: { title: string; SubCategory:{name:string;}; subtitle:string; subcategory_id: number | null; authors: { author: { name: string } }[]; long_text: string | null; }) => {
    let matches = true;

    // if (keywords) {
    //     const searchedKeywords = keywords.split(',').map(kw => kw.trim());
    //     matches = matches && searchedKeywords.some(keywordEntry => keywordEntry.toLowerCase().includes(art.SubCategory?.name.toLowerCase()));   
    // }

    if (authors) {
        const searchedAuthors = authors.split(',').map(author => author.trim());
        if (art.authors && Array.isArray(art.authors)) {
            matches = matches && searchedAuthors.some(authorEntry =>
                art.authors.some(artAuthor => artAuthor.author.name.toLowerCase().includes(authorEntry.toLowerCase()))
            );
        }
        // console.log('authors', authors)
    }

    // do the same for keywords (Category) and sites (Site)
    if (keywords) {
        const searchedKeywords = keywords.split(',').map(kw => kw.trim());
        console.log('keywords', keywords);
        if (art.SubCategories) {
            const categoryNames = art.SubCategories.map(subCat => subCat.SubCategory.Category?.name?.toLowerCase()).filter(Boolean);
            matches = matches && searchedKeywords.some(keywordEntry => 
                categoryNames.some(categoryName => keywordEntry.toLowerCase().includes(categoryName ?? ''))
            );
        }
    }
    if (sites) {
        const searchedSites = sites.split(',').map(site => site.trim());
        // This is wrong. Site is not a property of art, but a property of a User connected to the art by Author field (if there is a user)
        // if (art.SubCategory?.Category?.name) {
        //     const siteName = art.SubCategory.Category.name.toLowerCase();
        //     matches = matches && searchedSites.some(siteEntry => siteEntry.toLowerCase().includes(siteName));
        // }
    }


    if (query) {
        const queryLower = query.toLowerCase();
        matches = matches && (
            art.title.toLowerCase().includes(queryLower) ||
            art.subtitle?.toLowerCase().includes(queryLower) ||
            (art.SubCategories && art.SubCategories.some(subCat => 
                subCat.SubCategory.name !== null && subCat.SubCategory.name.toLowerCase().includes(queryLower)
            )) ||
            art.authors.some(authorEntry => authorEntry.author.name.toLowerCase().includes(queryLower)) ||
            (art.long_text !== null && art.long_text.toLowerCase().includes(queryLower))
        );
    }

    return matches;
    // console.log(matches)
    // return true;
};

// Filtered art array
const filteredArt = allArt ? allArt.filter(filterArt) : [];

    return (
        <main>
            <div className="w-full flex flex-row flex-nowrap items-center justify-between">
                <h1 className="">Offerings</h1>
                {
                    session && session.user &&
                    <Link href="/offerings/upload" className={`${"btn btn-outline p-2"}`}>Upload Work</Link>
                }
            </div>
            {
                searchParams &&
                <div className="flex flex-col gap-2">

                    {searchParams && searchParams.keywords &&
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            {/* <FiTriangle className="text-2xl text-base-content" /> */}
                            <p className="text-sm">Keywords:</p> 
                            <div className="flex flex-row flex-wrap gap-2">
                                {searchParams.keywords.split(',').map((kw, i) => {
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
                    {searchParams && searchParams.authors &&
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            {/* <FiTriangle className="text-2xl text-base-content" /> */}
                            <p className="text-sm">Authors:</p> 
                            <div className="flex flex-row flex-wrap gap-2">
                                {searchParams.authors.split(',').map((kw, i) => {
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
                    {searchParams && searchParams.sites &&
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            {/* <FiTriangle className="text-2xl text-base-content" /> */}
                            <p className="text-sm">Sites:</p> 
                            <div className="flex flex-row flex-wrap gap-2">
                                {searchParams.sites.split(',').map((kw, i) => {
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
            <div>
                <SearchBar />
            </div>
            <div>
                <OfferingsTopMenu />
            </div>
            {/* <div>
                <pre className="max-w-64 max-h-32 overflow-scroll text-xs">{JSON.stringify(searchParams, null, 2)}</pre>
            </div> */}
            <div className={`flex flex-row flex-wrap gap-4 px-1`}>

                {
                    filteredArt.map((art) => {
                        return (
                            <>
                                {/* <pre key={art.id} className="text-xs overflow-scroll w-64 h-64">{JSON.stringify(art, null, 2)}</pre> */}
                                <OfferingPreview key={art.id} art={art} />
                            </>
                        )
                    })
                }
            </div>

        </main>
    )
}
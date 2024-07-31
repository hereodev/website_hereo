import { auth } from "@/auth"
import prisma from "@/prisma";
import { FiTriangle } from "react-icons/fi";
import SearchBar from "@/app/offerings/_components/search-bar";
import Link from "next/link";
import OfferingsTopMenu from "@/app/offerings/_components/offerings-topmenu";
import { Art, UserRole } from "@prisma/client";
import OfferingPreview from "./_components/offering-preview";
import { ExtendedArt } from "@/global";


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
                SubCategory: {
                    select: {
                      name: true,
                      Category: true,
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
        console.log('keywords', keywords)
        if (art.SubCategory?.Category?.name) {
            const categoryName = art.SubCategory.Category.name.toLowerCase();
            matches = matches && searchedKeywords.some(keywordEntry => keywordEntry.toLowerCase().includes(categoryName));
        }
    }

    if (sites) {
        const searchedSites = sites.split(',').map(site => site.trim());
        if (art.SubCategory?.Category?.name) {
            const siteName = art.SubCategory.Category.name.toLowerCase();
            matches = matches && searchedSites.some(siteEntry => siteEntry.toLowerCase().includes(siteName));
        }
    }


    if (query) {
        const queryLower = query.toLowerCase();
        matches = matches && (
            art.title.toLowerCase().includes(queryLower) ||
            art.subtitle?.toLowerCase().includes(queryLower) ||
            (art.subcategory_id !== null && art.subcategory_id.toString().toLowerCase().includes(queryLower)) ||
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
            {searchParams && searchParams.keywords}
            <div>
                <SearchBar />
            </div>
            <div>
                <OfferingsTopMenu />
            </div>
            <div>
                <pre className="max-w-64 max-h-32 overflow-scroll text-xs">{JSON.stringify(searchParams, null, 2)}</pre>
            </div>
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
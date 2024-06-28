import { auth } from "@/auth"
import prisma from "@/prisma";
import { FiTriangle } from "react-icons/fi";
import SearchBar from "@/app/offerings/_components/search-bar";
import Link from "next/link";
import OfferingsTopMenu from "@/app/offerings/_components/offerings-topmenu";
import { Art } from "@prisma/client";
import OfferingPreview from "./_components/offering-preview";

export default async function Offerings() {
    const session = await auth();

    let allArt: Art[] = []
    // let allArt: Art & {associated_media?: any[]}[] = []
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

    // allArt = await prisma.art.findMany({
    //     include: {
    //         associated_media: {
    //             include: {
    //                 Media: true
    //             }
    //         },
    //         uploader: true,
    //         authors: true,
    //     }
    // })

    // allTags = await prisma.category.count()
    // allAuthors = await prisma.author.count()

    return (
        <main>
            <div className="w-full flex flex-row flex-nowrap items-center justify-between">
                <h1 className="">Offerings</h1>
                {
                    session && session.user &&
                    <Link href="/offerings/upload" className={`${"uppercase border p-2 hover:font-bold"}`}>Upload Work</Link>
                }
            </div>
        <div className={` grid grid-cols-1 md:grid-cols-3 gap-4 px-1`}>
            <div>
                <OfferingsTopMenu />
                <div className="divider my-2"><FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle></div>
            </div>

            {
                allArt && allArt.map((art) => {
                    return (
                        <>
                            {/* <pre className="text-xs overflow-scroll">{JSON.stringify(art, null, 2)}</pre> */}
                            <OfferingPreview key={art.id} art={art} />
                        </>
                    )
                })
            }
        </div>

        </main>
    )
}
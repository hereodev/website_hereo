import { auth } from "@/auth"
import prisma from "@/prisma";
import { FiTriangle } from "react-icons/fi";
import SearchBar from "./_components/search-bar";
import Link from "next/link";
import OfferingsMenu from "./_components/offerings-dashboard";

export default async function Offerings() {
    const session = await auth();

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
                <h1>Offerings</h1>
                {
                    session && session.user &&
                    <Link href="/offerings/upload" className={`${"btn btn-outline btn-primary"}`}>Upload Art</Link>
                }
            </div>
        <div className={` grid grid-cols-1 md:grid-cols-3 gap-4 px-1`}>
            <OfferingsMenu />
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
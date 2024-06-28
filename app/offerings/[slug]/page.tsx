import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"
import prisma from "@/prisma"
import { redirect } from "next/navigation"
import { FaFilePdf } from "react-icons/fa"
import OfferingsTopMenu from "@/app/offerings/_components/offerings-topmenu"
import { FiTriangle } from "react-icons/fi"

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const slug = params.slug
    const art = await prisma.art.findUnique({
        where: {
            slug: slug
        },
        include: {
          authors: {
            select: {
              author: true,
            }
          },
      }
    })

    // fetch data
    // const product = await fetch(`https://.../${slug}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    if(!art) {
      return {
        title: `#${slug} | Her(e) Otherwise | ${process.env.NODE_ENV}`,
      //   openGraph: {
      //     images: ['/some-specific-page-image.jpg', ...previousImages],
      //   },
      }
    }

    return {
      title: `${art.title} ${art.authors && `by ${art.authors.map(a => a.author.name).join(", ")}`} | Her(e) Otherwise | ${process.env.NODE_ENV}`,
    //   openGraph: {
    //     images: ['/some-specific-page-image.jpg', ...previousImages],
    //   },
    }
  }

export default async function Art({ params }: { params: { slug: string, lang: string } }) {

    const session = await auth();

    const slug = params.slug || "";
    const lang = params.lang || "en";

    if(!slug) {
      redirect("/offerings")
    }

    const art = await prisma.art.findUnique({
        where: {
            slug: slug
        },
        include: {
            associated_media: {
                include: {
                  Media: true
                }
            },
            uploader: {
                select: {
                    name: true,
                    email: true,
                }
            },
            authors: {
              select: {
                author: true,
              }
            },
            SubCategory: {
              select: {
                Category: true,
              } 
            },
        }
    })
    console.log("FOUND ART " + slug, art)

    if(art) {
      const artText = art.long_text && /^".*"$/.test(art.long_text)
      // Remove the '"' at the beginning and end of the string if they're there
        ? art.long_text.slice(1, -1)
        : art.long_text;
      return (
        <main>
          <h1>{art.title}</h1>
          {art.subtitle && <h2>{art.subtitle}</h2>}

          <p className="my-2 w-full text-right">Offered by: {art.authors.map(a => a.author.name).join(", ") || "Anonymous"}</p>

          {/* <p>Art page : Slug #{slug}</p> */}
          {/* {
              art && <pre className="overflow-x-auto text-xs">{JSON.stringify(art, null, 2)}</pre>
          } */}
          {/* {
            art.long_text && <div className="prose" dangerouslySetInnerHTML={{__html: art.long_text}}></div>
          } */}
          {
  artText && 
  <div className="prose w-full min-w-full" dangerouslySetInnerHTML={{__html: artText}}></div>
}
          {
            art.associated_media && 
            <div className="grid sm:grid-cols-2 sm:gap-4">
              {
              art.associated_media.map((media) => {
                return (
                  media.Media &&
                  <div key={media.media_id}>
                    {/* {media.Media.title && <h3>{media.Media.title}</h3>} */}
                    {
                      media.Media.type && media.Media.type.includes("image") && media.Media.url ?
                        <img src={media.Media.url} alt={media.Media.alt || media.Media.title || ""} />
                      : media.Media.type && media.Media.type.includes("video") && media.Media.url ?
                        <video src={media.Media.url} controls></video>
                      :
                        media.Media.url && media.Media.title &&
                        <a href={media.Media.url}>
                          <FaFilePdf className="w-12 h-12" />
                          {media.Media.title}
                        </a>
                    }
                  </div>
                )
              })
              }
            </div>
          }
          {/* <h2>Session (server)</h2>
          {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
          <UserSessionComp />
          { session && session.user && ((session.user as UserWithRole).slug == params.slug || ((session.user as UserWithRole).role && (session.user as UserWithRole).role.match("ADMIN"))) &&
            <button className="btn btn-primary">Edit my profile</button>
          } */}
          {/* <h2>Credits</h2> */}
          <div className="divider my-8"><FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle></div> 

          {/* <div className="grid sm:grid-cols-3 grid-cols-1 grid-rows-3">
            <div className="divider sm:divider-horizontal"></div>
            <div className="flex flex-col items-start">
              <p>Offered by: {art.authors.map(a => a.author.name).join(", ") || "People"}</p>

            </div>

          </div> */}
          <div className="flex flex-col sm:flex-row-reverse gap-4">
            <div className="flex-1 basis-[49%]">
              <p>Offered by: {art.authors.map(a => a.author.name).join(", ") || "Anonymous"}</p>
              <p>Sites of belonging: []</p>
              <p>Keywords: []</p>
            </div>
            <div className="basis-[2%] divider sm:divider-horizontal"></div>
            <div className="flex-1 basis-[49%]">
              <OfferingsTopMenu />
            </div>
          </div>
        </main>
      )

    } else {
      //  404
      return (
        <main>
          <h1>404</h1>
          <p>Art page not found</p>
        </main>
      )
    }

}
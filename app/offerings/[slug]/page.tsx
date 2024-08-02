import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"
import prisma from "@/prisma"
import { redirect } from "next/navigation"
import { FaFileAlt, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa"
import OfferingsTopMenu from "@/app/offerings/_components/offerings-topmenu"
import { FiEdit2, FiTriangle } from "react-icons/fi"
import Link from "next/link"
import PictureZoom from "../_components/picture-zoom"
import VideoPlayer from "@/app/_components/video-player"


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
                    id: true,
                }
            },
            authors: {
              select: {
                author: true,
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
  }
    })
    // console.log("FOUND ART " + slug, art)

    if(art) {
    
      const artText = art.long_text && /^".*"$/.test(art.long_text)
      // Remove the '"' at the beginning and end of the string if they're there
        ? art.long_text.slice(1, -1)
        : art.long_text;
      return (
        <main>
          <div className="flex flex-row w-full justify-between items-center">
            <h1>{art.title}</h1>
            <div className="flex flex-row justify-center items-center gap-2">
              {
                session && session.user && art.uploader.id == session.user.id && //|| (((session.user as UserWithRole).role && (session.user as UserWithRole).role.match("ADMIN"))) &&
                <Link href={`/offerings/${art.slug}/edit`} className="btn btn-outline">
                  <FiEdit2 />
                  Edit
                </Link>
              }
              {
                session && session.user && art.uploader.id == session.user.id && //|| (((session.user as UserWithRole).role && (session.user as UserWithRole).role.match("ADMIN"))) &&
                <Link href={`/offerings/upload`} className="btn btn-outline">
                  Upload work
                </Link>
              }
            </div>
          </div>
          {art.subtitle && <h2>{art.subtitle}</h2>}

          <p className="my-2 w-full text-left">Offered by: {art.authors.map(a => a.author.name).join(", ") || "Anonymous"}</p>

          {
            artText && 
            <div className="prose w-full min-w-full" dangerouslySetInnerHTML={{__html: artText}}></div>
          }
          {
            art.associated_media && 
            <div className="grid sm:grid-cols-2 sm:gap-4">
              {
              art.associated_media
              .sort((a, b) => {
                const isAImageOrVideo = a.Media?.type?.includes("image") || a.Media?.type?.includes("video");
                const isBImageOrVideo = b.Media?.type?.includes("image") || b.Media?.type?.includes("video");
                if (isAImageOrVideo && !isBImageOrVideo) return 1;
                if (!isAImageOrVideo && isBImageOrVideo) return -1;
                return 0;
              })
              .map((media) => {
                return (
                  media.Media &&
                  <div key={media.media_id}>
                    {/* {
                      media.Media.type && media.Media.type.includes("image") && media.Media.url ?
                        // <Zoom><img src={media.Media.url} alt={media.Media.alt || media.Media.title || ""} /></Zoom>
                        <PictureZoom src={media.Media.url} alt={media.Media.alt || media.Media.title || ""} />
                      : media.Media.type && media.Media.type.includes("video") && media.Media.url ?
                        <video src={media.Media.url} controls></video>
                      : media.Media.type && media.Media.type === "application/pdf" && media.Media.url ?
                        <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
                          <FaFilePdf className="w-12 h-12" />
                          {media.Media.title}
                        </a>
                      : media.Media.type && (media.Media.type === "application/vnd.ms-powerpoint" || media.Media.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") && media.Media.url ?
                        <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
                          <FaFilePowerpoint className="w-12 h-12" />
                          {media.Media.title}
                        </a>
                      : media.Media.type && media.Media.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && media.Media.url ?
                        <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
                          <FaFileWord className="w-12 h-12" />
                          {media.Media.title}
                        </a>
                      :
                        media.Media.url && media.Media.title &&
                        <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
                          <FaFileAlt className="w-12 h-12" />
                          {media.Media.title}
                        </a>
                    } */}
                    {
  media.Media.type && media.Media.type.includes("image") && media.Media.url ? (
    <>
      <PictureZoom src={media.Media.url} alt={media.Media.alt || media.Media.title || ""} />
      {
        media.Media.description && <p>{media.Media.description}</p>
      }
    </>
  ) : media.Media.type && media.Media.type.includes("video") && media.Media.url ? (
    <video src={media.Media.url} controls></video>
  ) : media.Media.type && media.Media.type === "application/pdf" && media.Media.url ? (
    <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
      <FaFilePdf className="w-12 h-12" />
      {media.Media.title}
    </a>
  ) : media.Media.type && (media.Media.type === "application/vnd.ms-powerpoint" || media.Media.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") && media.Media.url ? (
    <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
      <FaFilePowerpoint className="w-12 h-12" />
      {media.Media.title}
    </a>
  ) : media.Media.type && media.Media.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && media.Media.url ? (
    <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
      <FaFileWord className="w-12 h-12" />
      {media.Media.title}
    </a>
  // ) : media.Media.url && (new URL(media.Media.url).hostname.includes("youtube.com") || new URL(media.Media.url).hostname.includes("vimeo.com")) ? (
  ) : media.Media.url && (new URL(media.Media.url).hostname === "www.youtube.com" || new URL(media.Media.url).hostname === "vimeo.com") ? (
    // <p>{media.Media.url}</p>
    <VideoPlayer videoSrc={media.Media.url} />
  ) : media.Media.url && media.Media.title ? (
    <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
      <FaFileAlt className="w-12 h-12" />
      {media.Media.title}
    </a>
  ) : media.Media.url && !media.Media.title ? (
    <a href={media.Media.url} className="flex items-center justify-center w-full h-full">
      <FaFileAlt className="w-12 h-12" />
      {"See more at " + new URL(media.Media.url).hostname}
    </a>
  ) : null
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
            <button className="btn btn-outline">Edit my profile</button>
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
              <p>Keywords: {art.SubCategories.map(subCat => subCat.SubCategory.name).join(", ")}</p>
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
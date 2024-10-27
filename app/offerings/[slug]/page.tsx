import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"
import prisma from "@/prisma"
import { redirect } from "next/navigation"
import { FaExternalLinkAlt, FaFileAlt, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa"
import OfferingsTopMenu from "@/app/offerings/_components/offerings-topmenu"
import { FiEdit2, FiPlus, FiTriangle } from "react-icons/fi"
import Link from "next/link"
import PictureZoom from "../_components/picture-zoom"
import VideoPlayer from "@/app/_components/video-player"
import VidPlayer from "@/app/_components/vid"


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
          associated_media: {
            include: {
              Media: true
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
        title: `:Her(e) Otherwise: #${slug}`,
      //   openGraph: {
      //     images: ['/some-specific-page-image.jpg', ...previousImages],
      //   },
      }
    }

    const mediaImages = art.associated_media
    .filter(media => media.Media && media.Media.url && media.Media.url.startsWith('https://hereotherwise.b-cdn.net/') && (media.Media.url.endsWith('.jpg') || media.Media.url.endsWith('.png')))
    .map(media => ({
        url: media.Media.url ? media.Media.url.replace('https://hereotherwise.b-cdn.net/', 'https://hereo.imgix.net/') : '',
        width: 1200, // You can adjust the width and height as needed
        height: 630,
        alt: media.Media.alt || media.Media.title || ":Her(e) Otherwise - Open Graph Image",
    }));

    const og = mediaImages.length > 0 ? 
    {
      title: `:Her(e) Otherwise: ${art.title} ${art.authors && `an Offering by ${art.authors.map(a => a.author.name).join(", ")}`}`,
      description: `${art.long_text && art.long_text.slice(0, 160)}`,
      images: mediaImages,
    } : {
      title: `:Her(e) Otherwise: ${art.title} ${art.authors && `an Offering by ${art.authors.map(a => a.author.name).join(", ")}`}`,
      description: `${art.long_text && art.long_text.slice(0, 160)}`,
      images: previousImages,
    }

    return {
      title: `:Her(e) Otherwise: ${art.title} ${art.authors && `an Offering by ${art.authors.map(a => a.author.name).join(", ")}`}`,
      openGraph: og,
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
                session && session.user && (
                  art.uploader.id == session.user.id 
                || 
                ((session.user as UserWithRole).role && (session.user as UserWithRole).role.match("ADMIN"))) &&
                <Link href={`/offerings/${art.slug}/edit`} className="btn btn-outline hover:btn-primary">
                  <FiEdit2 />
                  Edit
                </Link>
              }
              {
                session && session.user && art.uploader.id == session.user.id && //|| (((session.user as UserWithRole).role && (session.user as UserWithRole).role.match("ADMIN"))) &&
                <Link href={`/offerings/upload`} className="btn btn-outline hover:btn-primary flex gap-2">
                  <FiPlus />
                  Upload work
                </Link>
              }
            </div>
          </div>
          {art.subtitle && <h2>{art.subtitle}</h2>}

          <p className="my-2 w-full text-left">Offered by: {art.authors.map(a => a.author.name).join(", ") || "Anonymous"}</p>
        {art.SubCategories.length > 0 && (
            <p className="my-2 w-full text-left">Keywords: {art.SubCategories.map(subCat => subCat.SubCategory.name).join(", ")}</p>
        )}
        {art.SubCategories.length > 0 && (
            <p className="my-2 w-full text-left">Categories: {[...Array.from(new Set(art.SubCategories.map(subCat => subCat.SubCategory.Category?.name || ""))).filter((name: any) => name)].join(", ")}</p>
        )}
        <br/>
          {
            artText && 
            <div className="prose w-full min-w-full max-w-screen pb-6" dangerouslySetInnerHTML={{__html: artText}}></div>
          }
          <br />
          <br />
          {
            art.associated_media && 
            <div className={`grid ${art.associated_media.length <= 1 ? 'grid-cols-1' : 'sm:grid-cols-2 sm:gap-4'}`}>
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
                  <div key={media.media_id} 
                  // className={`min-h-64 ${art.associated_media.length > 1 && ((media.Media.type && media.Media.type.includes("video")) || media.Media.url && (new URL(media.Media.url).hostname === "www.youtube.com" || new URL(media.Media.url).hostname === "vimeo.com")) ? "col-span-2" : ""}`}
                  >
                    {
  media.Media.type && media.Media.type.includes("image") && media.Media.url ? (
    <>
      <PictureZoom src={media.Media.url} alt={media.Media.alt || media.Media.title || ""} />
      {
        media.Media.description && <p>{media.Media.description}</p>
      }
    </>
  ) : media.Media.type && media.Media.type.includes("video") && media.Media.url ? (
      <VideoPlayer videoSrc={media.Media.url} ctrls={true} cn={"h-12"} />
  ) : media.Media.type && media.Media.type === "application/pdf" && media.Media.url ? (
    <div className="flex items-center justify-center w-full h-full gap-2">
    <a href={media.Media.url} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 flex flex-col items-center justify-center bg-primary">
      <span className="text-xs text-black text-center truncate w-full px-2">{media.Media.title}</span>
    </a>
    </div>
  ) : media.Media.type && (media.Media.type === "application/vnd.ms-powerpoint" || media.Media.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") && media.Media.url ? (
    <div className="flex items-center justify-center w-full h-full gap-2">
    <a href={media.Media.url} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 flex flex-col items-center justify-center bg-primary">
      <span className="text-xs text-black text-center truncate w-full px-2">{media.Media.title}</span>
    </a>
    </div>
  ) : media.Media.type && media.Media.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && media.Media.url ? (
    <div className="flex items-center justify-center w-full h-full gap-2">
    <a href={media.Media.url} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 flex flex-col items-center justify-center bg-primary">
      <span className="text-xs text-black text-center truncate w-full px-2">{media.Media.title}</span>
    </a>
    </div>
  ) : media.Media.url && (new URL(media.Media.url).hostname === "www.youtube.com" || new URL(media.Media.url).hostname === "youtu.be" || new URL(media.Media.url).hostname === "vimeo.com") ? (
    // <div className="h-screen w-full relative">
      <VidPlayer videoSrc={media.Media.url} ctrls={true} cn={"max-w-[90vw]"} />
    // </div>
  ) : media.Media.url && media.Media.title ? (
    <div className="flex items-center justify-center w-full h-full gap-2">
    <a href={media.Media.url} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 flex flex-col items-center justify-center bg-primary">
      <span className="text-xs text-black text-center truncate w-full px-2">{media.Media.title}</span>
    </a>
    </div>
  ) : media.Media.url && (media.Media.type == "link" || media.Media.type?.toLowerCase() == "website")? (
      <div className="flex items-center justify-center w-full h-full gap-2">
      <a href={media.Media.url} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 flex flex-col items-center justify-center bg-primary">
        <FaExternalLinkAlt className="text-xs text-black w-6 h-6" />
        <span className="text-xs text-black text-center truncate w-full px-2">{media.Media.title}</span>
      </a></div>
  
  ) : null}
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
            <button className="btn btn-outline hover:btn-primary">Edit my profile</button>
          } */}
          {/* <h2>Credits</h2> */}
          {/* <div className="divider my-8"><FiTriangle className="h-8 w-8" style={{transform: "rotate(180deg)"}}></FiTriangle></div>  */}

          {/* <div className="grid sm:grid-cols-3 grid-cols-1 grid-rows-3">
            <div className="divider sm:divider-horizontal"></div>
            <div className="flex flex-col items-start">
              <p>Offered by: {art.authors.map(a => a.author.name).join(", ") || "People"}</p>

            </div>

          </div> */}
          {/* <div className="flex flex-col sm:flex-row-reverse gap-4">
            <div className="flex-1 basis-[49%]">
            {art.authors.length > 0 && (
              <p>Offered by: {art.authors.map(a => a.author.name).join(", ") || "Anonymous"}</p>
            )}
            {art.SubCategories.length > 0 && (
              <p>Keywords: {art.SubCategories.map(subCat => subCat.SubCategory.name).join(", ")}</p>
            )} */}
            {/* {art.SitesOfBelonging && art.SitesOfBelonging.length > 0 && ( */}
              {/* <p>Sites of belonging: {art.SitesOfBelonging.join(", ")}</p> */}
            {/* )} */}
            {/* </div> */}
            {/* <div className="basis-[2%] divider sm:divider-horizontal"></div>
            <div className="flex-1 basis-[49%]">
              <OfferingsTopMenu />
            </div> */}
          {/* </div> */}
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
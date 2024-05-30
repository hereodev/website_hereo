import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"
import prisma from "@/prisma"
import { redirect } from "next/navigation"

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

    // fetch data
    // const product = await fetch(`https://.../${slug}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
      title: `#${slug} | Her(e) Otherwise | ${process.env.NODE_ENV}`,
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
            authors: true,
        }
    })
    console.log("FOUND ART " + slug, art)

    if(art) {
      return (
        <main>
          <h1>{art.title}</h1>
          <h2>{art.subtitle}</h2>
          <p>Art page : Slug #{slug}</p>
          {
              art && <pre className="overflow-x-auto text-xs">{JSON.stringify(art, null, 2)}</pre>
          }
          {
            art.associated_media && 
            <div>
              <h2>Media</h2>
              {
              art.associated_media.map((media) => {
                return (
                  media.Media &&
                  <div key={media.media_id}>
                    {media.Media.title && <h3>{media.Media.title}</h3>}
                    {
                      media.Media.type && media.Media.type.includes("image") && media.Media.url ?
                        <img src={media.Media.url} alt={media.Media.alt || ""} />
                      : media.Media.type && media.Media.type.includes("video") && media.Media.url ?
                        <video src={media.Media.url} controls></video>
                      :
                        media.Media.url && media.Media.title &&
                        <a href={media.Media.url}>{media.Media.title}</a>
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
          <h2>Credits</h2>
          <p>Offered by: {art.authors.map(a => a.author_id).join(", ") || "People"}</p>
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
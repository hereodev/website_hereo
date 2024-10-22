import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"
import { redirect } from "next/navigation"
import EditableProfile from "@/app/_components/auth/editable-profile"
import prisma from "@/prisma"
import Link from "next/link"
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi"
import Image from "next/image"
import { deleteArt, logArtDetails } from "../lib/actions_db"
import PreviewArt from "./_components/preview-art"
import LogoutBtn from "../_components/auth/logout-btn"

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {

    const session = await auth();

    if(!session) {
      return {
        title: `Sign in | Her(e) Otherwise | ${process.env.NODE_ENV}`,
      }
    }

    const id = session.user?.id

    // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []


    return {
      title: `My Profile | Her(e) Otherwise | ${process.env.NODE_ENV}`,
    //   openGraph: {
    //     images: ['/some-specific-page-image.jpg', ...previousImages],
    //   },
    }
  }

export default async function Profile() {
    const session = await auth();

    if(session && session.user) {

    const id = session.user?.id

    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
          author_info: {
              include: {
                  sitesOfBelonging: true
              }
          }
      }
    })

  // console.log("SITES!!!",user.author_info.sitesOfBelonging)
  const sites: (string)[] = ['', '', ''];
  if(user && user.author_info && user.author_info.sitesOfBelonging) {
    user.author_info.sitesOfBelonging.forEach(site => {
      if (site.number >= 1 && site.number <= 3) {
          sites[site.number - 1] = site.text;
      }
    });

  }

  // Extract the sites of belonging
  // const sites = user.author_info.sitesOfBelonging.sort((a,b) => a.number - b.number).map((site) => {
  //     return site.text;
  // });
  // const sites = user.author_info.sitesOfBelonging.slice(0, 3);

  // Fill the array to ensure it has 3 elements
  // while (sites.length < 3) {
  //     sites.push(null);
  // }
    const relatedAuthors = await prisma.author.findFirst({})

    var userArt = await prisma.art.findMany({
        where: {
            uploader_id: id
        }
    })

    const userMedia = await prisma.media.findMany({
        where: {
            uploader_id: id
        }
    })

    const handleDeleteArt = (artId: number) => {
      // remove artId from userArt
      userArt = userArt.filter((art) => art.id !== artId)
    }

    return (
      <main>
        <h1>My Profile</h1>
        {/* <p>Art page : ID #{session.user.id}</p> */}
        {/* {session && <pre>{JSON.stringify(session, null, 2)}</pre>} */}
        {
          user && 
          <EditableProfile 
            userId={session.user.id} 
            initialName={user.name} 
            initialEmail={user.email} 
            initialMedia={userMedia}
            initialSites={sites}
          />
        }
        <div className="flex flex-row items-end gap-6">
          <h2>My Offering(s)</h2>
          <Link href="/offerings/upload" className={`${"btn btn-xs btn-outline hover:btn-primary mb-4 flex gap-2"}`}>
            <FiPlus />
            Upload Work
          </Link>
        </div>
        {
          userArt.length === 0 ? <p>No art uploaded yet.</p>
          :
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
           { userArt.map((art) => {
              return (
                <PreviewArt key={art.id} art={art} />
                // <div key={art.slug} className="flex flex-row items-center w-full border border-dashed p-1">
                //   <Link href={`/offerings/${art.slug}`} className="grow hover:underline text-xs">{art.title}</Link>
                //   <button className="btn btn-square hover:text-primary" title="Edit" aria-disabled={true} disabled>
                //     <FiEdit />
                //   </button>
                //   <button className="btn btn-square hover:text-error" title="Delete" 
                //     // aria-disabled={true} disabled
                //     onClick={() => handleDeleteArt(art.id)}
                //   >
                //     <FiTrash />
                //   </button>
                // </div>
              )
            })
          }
          </div>
        }
                {/* 
        <h2>My Media</h2>
        <p>Soon this area will allow you to delete/edit your uploaded media.</p>
              <div className="flex flew-row gap-2 flex-wrap">
        {
          userMedia.length === 0 ? <p>No media uploaded yet.</p>
          :
          userMedia.map((media) => {
            if(media.url === null || media.url === undefined) return null
            return (
              <div key={media.id} title={media.title || ""} className="w-24 h-24">
                <p>{media.title}</p> 
                <p>{media.description}</p> 
                <pre className="text-xs w-24 h-24 overflow-scroll">{JSON.stringify(media, null, 2)}</pre> 
                <img 
                  src={media.url} 
                  alt={media.title || ""} 
                  className="object-contain object-center w-full"
                />
              </div>
            )
          })
        }
        </div>
                */}

                <LogoutBtn />
      </main>
    )

    } else {
        redirect('/auth/signin')
    }
}
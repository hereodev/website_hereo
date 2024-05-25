import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"
import { redirect } from "next/navigation"
import EditableProfile from "@/app/_components/auth/editable-profile"
import prisma from "@/prisma"
import Link from "next/link"
import { FiEdit, FiTrash } from "react-icons/fi"

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
      title: `#${id} | Her(e) Otherwise | ${process.env.NODE_ENV}`,
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
        }
    })

    const userArt = await prisma.art.findMany({
        where: {
            uploader_id: id
        }
    })

    const userMedia = await prisma.media.findMany({
        where: {
            uploader_id: id
        }
    })

    return (
      <main>
        <h1>My Profile</h1>
        {/* <p>Art page : ID #{session.user.id}</p> */}
        {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
        {
          user && 
          <EditableProfile userId={session.user.id} initialName={user.name} initialEmail={user.email} />
        }
        <div className="flex flex-row items-end gap-6">
          <h2>My Art</h2>
          <Link href="/offerings/upload" className={`${"btn btn-xs btn-primary mb-3"}`}>Upload Art</Link>
        </div>
        {
          userArt.length === 0 ? <p>No art uploaded yet.</p>
          :
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
           { userArt.map((art) => {
              return (
                <div key={art.slug} className="flex flex-row items-center w-full border border-dashed p-1">
                  <Link href={`/offerings/${art.slug}`} className="grow hover:underline text-xs">{art.title}</Link>
                  <button className="btn btn-square hover:text-primary" title="Edit" aria-disabled={true} disabled>
                    <FiEdit />
                  </button>
                  <button className="btn btn-square hover:text-error" title="Delete" aria-disabled={true} disabled>
                    <FiTrash />
                  </button>
                </div>
              )
            })
          }
          </div>
        }
        <h2>My Media</h2>
        {
          userMedia.length === 0 ? <p>No media uploaded yet.</p>
          :
          userMedia.map((media) => {
            return (
              <div key={media.id}>
                <p>{media.title}</p>
                {/* <img src={media.url} alt={media.title} /> */}
              </div>
            )
          })
        }

      </main>
    )

    } else {
        redirect('/auth/signin')
    }
}
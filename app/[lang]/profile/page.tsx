import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"
import { redirect } from "next/navigation"
import EditableProfile from "@/app/_components/auth/editable-profile"
import prisma from "@/prisma"

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
        <h1>Profile</h1>
        {/* <p>Art page : ID #{session.user.id}</p> */}
        {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
        {/* <EditableProfile userId={session.user.id} initialName={session.user.name} initialEmail={session.user.email} /> */}
        <button className="btn btn-primary">Edit my profile</button>
        <h2>My Media</h2>
        {
          userMedia.map((media) => {
            return (
              <div key={media.id}>
                <p>{media.title}</p>
                {/* <img src={media.url} alt={media.title} /> */}
              </div>
            )
          })
        }
        <h2>My Art</h2>
        {
          userArt.map((art) => {
            return (
              <div key={art.id}>
                <p>{art.title}</p>
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
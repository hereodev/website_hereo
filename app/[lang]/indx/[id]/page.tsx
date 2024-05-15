import { auth } from "@/auth"
import type { Metadata, ResolvingMetadata } from 'next'
import { User as UserSessionComp } from "@/app/_components/user"
import { User } from "next-auth"
import { UserWithRole } from "@/global"

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
      title: `${id} | Her(e) Otherwise | ${process.env.NODE_ENV}`,
    //   openGraph: {
    //     images: ['/some-specific-page-image.jpg', ...previousImages],
    //   },
    }
  }

export default async function Art({ params }: { params: { id: string, lang: string } }) {

    const session = await auth();

    return (
      <main>
        <h1>Art</h1>
        <p>Art page : ID #{params.id}</p>
        <h2>Session (server)</h2>
        {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
        <UserSessionComp />
        { session && session.user && ((session.user as UserWithRole).id == params.id || ((session.user as UserWithRole).role && (session.user as UserWithRole).role.match("ADMIN"))) &&
          <button className="btn btn-primary">Edit my profile</button>
        }
      </main>
    )
}
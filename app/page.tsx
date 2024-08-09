import { type Locale } from "@/i18n-config"
import { Metadata } from "next";
import { User } from "@/app/_components/user";
// import prisma from "@/prisma"
import VideoPlayer from "@/app/_components/video-player";
// import React from "react";
// import ReactPlayer from 'react-player';
import dynamic from 'next/dynamic'
import Invitations from "@/app/_components/invitations";

export const metadata: Metadata = {
    title: ":Her(e) Otherwise",
    description: "This platform responds to the urgent need to gather an open, interactive, and expanding community of black women engaged in the broadest possible range of self-determined acts and operations within the disciplines of architecture and urban design, and within the discourse of all spatial practices.",
};


export default async function Page({ params: { lang } } : { params: { lang: Locale } }) {
    // const prismaUser = await prisma.user.findUnique({where: {id: "0f86eabc-42e1-4687-b6b1-42654fcf036b"}})
    // console.log('USER:', prismaUser)

    return (
        <main className="flex flex-col items-center justify-between">
            {/* <div className="z-20 text-3xl font-semibold">Welcome.</div> */}
            {/* <Invitations welcome /> */}
            <VideoPlayer />

        {/* <h1>Page in Lang</h1>
        <p>Lang: {lang}</p>
        <h1>Connected ??</h1>
        <User />
        <br />
        <h1>Prisma users?? User id 0f86eabc-42e1-4687-b6b1-42654fcf036b ??</h1>
        {
            prismaUser && (
                <div>
                    <p>id: {prismaUser.id}</p>
                    <p>name: {prismaUser.name}</p>
                    <p>email: {prismaUser.email}</p>
                    <p>role: {prismaUser.role}</p>
                </div>
            )
        } */}
        {/* <p>{prismaUser?.name || prismaUser?.email}</p> */}
        </main>
    )
}
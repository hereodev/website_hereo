"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'

export default function VideoPlayer() {

    let videoSrc = 'https://hereotherwise.b-cdn.net/assets_website/landing_vid.mp4';
    const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    return (
        <div className="relative w-full h-full">
    {/* <div className="absolute z-0 h-screen w-auto overflow-x-hidden top-0 left-0"> */}
    {/* <div className="absolute z-0 h-screen w-auto overflow-x-hidden top-0 left-0 flex items-center justify-center"> */}
    {
        hasWindow &&
            <ReactPlayer
                // url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                url={videoSrc}
                // height={'100vh'}
                height="100%"
                width={"auto"}
                controls={false}
                // light is usefull incase of dark mode
                light={false}
                playing={true}
                loop={true}
                // picture in picture
                // pip={true}
                // style={{ objectFit: 'cover', objectPosition: 'center', border:"3px solid red" }}
                className="hero-video absolute top-0 left-0 h-full w-auto"
            />
    }
    </div>
    )

}
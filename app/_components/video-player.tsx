"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { FiPause } from "react-icons/fi";

export default function VideoPlayer({ videoSrc = "https://hereotherwise.b-cdn.net/assets_website/intro_EN.mp4", cn, ctrls=false } : { videoSrc?: string, cn?: string, ctrls?: boolean }) {

    // let videoSrc = 'https://hereotherwise.b-cdn.net/assets_website/intro_EN.mp4';
    // let videoSrcFr = 'https://hereotherwise.b-cdn.net/assets_website/intro_FR.mp4';
    const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    return (
        <div>
            {/* <div className="absolute btn btn-outline hover:btn-primary btn-primary top-20 right-16 z-50">
                <FiPause />
                PAUSE
            </div> */}
        {/* FIXME: only if doesnt prefer reduced motion */}
        {
            hasWindow &&
                <ReactPlayer
                    // url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                    url={videoSrc}
                    // height={'100vh'}
                    height="100%"
                    controls={ctrls}
                    // playIcon={<button>Play</button>}
                    // light={false}
                    muted={true}
                    playing={true}
                    loop={true}
                    // picture in picture
                    // pip={true}
                    // style={{ objectFit: 'cover', objectPosition: 'center', border:"3px solid red" }}
                    // className="hero-video absolute top-0 left-0 h-full w-auto"
                    id="background-video"
                    className={cn}
                />
        }
        </div>
    )

}


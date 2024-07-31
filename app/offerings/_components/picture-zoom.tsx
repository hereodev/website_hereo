"use client";

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


export default function PictureZoom({ src, alt } : { src: string, alt: string }) {
    return (
        <Zoom>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} />
        </Zoom>
    )
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function SocialShareButtons() {
    // const router = useRouter();
    // const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
    const pathname = usePathname();
    const currentUrl = `https://hereotherwise.site${pathname}`; // Construct the full URL

    const openShareWindow = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex space-x-4 items-center my-6">
            <span className="text-base-content">Share:</span>
            {/* Facebook Button */}
            <Link
                target="_blank"
                rel="noopener noreferrer"
                className="badge hover:badge-primary text-base-content hover:text-black badge-lg rounded-full h-12 w-12"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                aria-label="Share on Facebook"
            >
                <FiFacebook className="h-6 w-6" />
            </Link>

            {/* Twitter Button */}
            <Link
                target="_blank"
                rel="noopener noreferrer"
                className="badge hover:badge-primary text-base-content hover:text-black badge-lg rounded-full h-12 w-12"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(":Her(e) Otherwise")}`}
                aria-label="Share on Twitter"
            >
                <FaXTwitter  className="h-6 w-6" />
            </Link>

            {/* LinkedIn Button */}
            <Link
                target="_blank"
                rel="noopener noreferrer"
                className="badge hover:badge-primary text-base-content hover:text-black badge-lg rounded-full h-12 w-12"
                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(":Her(e) Otherwise")}`}
                aria-label="Share on LinkedIn"
            >
                <FiLinkedin className="h-6 w-6" />
            </Link>

            {/* WhatsApp Button */}
            <Link
                target="_blank"
                rel="noopener noreferrer"
                className="badge hover:badge-primary text-base-content hover:text-black badge-lg rounded-full h-12 w-12"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
                aria-label="Share on WhatsApp"
            >
                <FaWhatsapp className="h-6 w-6" />
            </Link>
        </div>
    );
}

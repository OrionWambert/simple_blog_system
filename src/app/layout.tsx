import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import {Navbar} from "@/components/organisms";
import {ReactNode} from "react";

const inter = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Simple Blog System",
    description: "A modern blog system built with Next.js",
    metadataBase: new URL('https://simple-blog-system.com'),
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: '/',
        siteName: 'Simple Blog System',
        title: 'Simple Blog System',
        description: 'A modern blog system built with Next.js',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Simple Blog System'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Simple Blog System',
        description: 'A modern blog system built with Next.js',
        creator: '@simpleblogsys',
        images: ['/og-image.png']
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode
}>) {
    return (<html lang="fr">
        <body
            className={`${inter.variable} antialiased`}
        >
        <Providers>
            <Navbar/>
            {children}
        </Providers>
        </body>
        </html>
    );
}

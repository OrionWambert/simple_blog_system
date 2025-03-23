import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        dangerouslyAllowSVG:true,

        remotePatterns: [
            {
                hostname: "cdn.pixabay.com",
                protocol: "https"
            },
            {hostname: "raw.githubusercontent.com", protocol: "https"},
            {hostname: "placehold.co", protocol: "https"},
            {hostname: "www.w3.org", protocol: "https"},
            {hostname: "images.unsplash.com", protocol: "https"},
            {hostname: "avatars.githubusercontent.com", protocol: "https"},
        ]
    }
};

export default nextConfig;

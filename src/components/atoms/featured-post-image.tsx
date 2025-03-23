import Image from "next/image";

export type FeaturedPostImageProps = {
    src: string;
    alt: string;
}

export function FeaturedPostImage({src, alt}: FeaturedPostImageProps) {
    return <Image
        src={src}
        alt={alt}
        fill
        className="w-full h-full object-cover opacity-50"
    />
}

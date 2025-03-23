'use client'

import React, {useState} from 'react'
import Image from "next/image";

type HeroImageProps = {
    src?: string
    alt: string
}

export function HeroImage({src, alt}: HeroImageProps) {
    const [hasError, setHasError] = useState(false)

    if (!src || hasError) {
        return null
    }

    return (
        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
            <Image
                fill
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                onError={() => setHasError(true)}
            />
        </div>
    )
}

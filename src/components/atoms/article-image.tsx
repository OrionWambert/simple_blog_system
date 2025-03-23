import Image from 'next/image'
import {useState} from 'react'
import {FallbackGradient} from './fallback-gradient'

interface ArticleImageProps {
    src: string
    alt: string
}

export function ArticleImage({src, alt}: ArticleImageProps) {
    const [error, setError] = useState(false)

    if (error) {
        return <FallbackGradient/>
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-all"
            onError={() => setError(true)}
        />
    )
}

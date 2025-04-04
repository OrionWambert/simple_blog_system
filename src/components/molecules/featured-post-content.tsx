'use client'

import {motion} from "framer-motion";
import {Post} from "@/types/post";
import {FallbackGradient} from "@/components/atoms/fallback-gradient";
import {FeaturedPostImage} from "@/components/atoms/featured-post-image";
import {ImageBlock} from "@/types/block";

export type FeaturedPostContentProps = {
    featuredPost: Post
}

export function FeaturedPostContent({featuredPost}: FeaturedPostContentProps) {
    const checkFeaturedPostImage = () => {
        const imageBlock = featuredPost.content?.blocks?.find(block => block.type === 'image') as ImageBlock | undefined;
        return imageBlock?.url;
    }
    const hasFeaturedPostImage = checkFeaturedPostImage();
    return <motion.div
        initial={{scale: 1.1, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        transition={{duration: 0.7}}
        className="absolute inset-0 z-0"
    >
        {hasFeaturedPostImage ? (
            <FeaturedPostImage src={hasFeaturedPostImage}
                               alt={featuredPost.title}/>
        ) : (
            <FallbackGradient/>
        )}
    </motion.div>
}

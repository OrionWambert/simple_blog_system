import {motion} from "framer-motion";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage, Button} from "@/components/atoms";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {FeaturedPostContentProps} from "@/components/molecules/featured-post-content";


export function FeaturedPostDescription({featuredPost}: FeaturedPostContentProps) {
    return (
        <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.2}}
            className="max-w-3xl"
        >
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
              Article à la Une
            </span>
            <Link href={`/posts/${featuredPost.slug}`}>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:text-blue-300 transition-colors">
                    {featuredPost.title}
                </h1>
            </Link>
            <p className="text-xl text-gray-300 mb-6 line-clamp-2">
                {featuredPost.description}
            </p>
            <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 ring-2 ring-white/50">
                    <AvatarImage src={featuredPost.author.image ?? undefined}/>
                    <AvatarFallback>{featuredPost.author.name?.[0] ?? 'A'}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium">{featuredPost.author.name}</div>
                    <time className="text-sm text-gray-400">
                        {format(new Date(featuredPost.createdAt), 'PPP', {locale: fr})}
                    </time>
                </div>
                <Button variant="secondary" className="ml-auto" asChild>
                    <Link href={`/posts/${featuredPost.slug}`}>
                        Lire l&apos;article
                    </Link>
                </Button>
            </div>
        </motion.div>
    )
}
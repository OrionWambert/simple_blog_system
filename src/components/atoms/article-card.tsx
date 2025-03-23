import {motion} from "framer-motion";
import Link from "next/link";
import {Post} from "@/types/post";
import {FallbackGradient} from "@/components/atoms/fallback-gradient";
import {ArticleImage} from "@/components/atoms/article-image";
import {ArticleCardAuthor} from "@/components/atoms/article-card-author";

const item = {
    hidden: {opacity: 0, y: 20, scale: 0},
    show: {opacity: 1, y: 0, scale: 1},
}

export function ArticleCard({post}: { post: Post }) {
    const findPostImage = () => {
        const imageBlock = post.content?.blocks?.find(block => block.type === 'image');
        if (imageBlock && 'url' in imageBlock) {
            return imageBlock.url;
        }
        if (imageBlock && 'content' in imageBlock) {
            return imageBlock.content;
        }
        return undefined;
    }

    const postImage = findPostImage();

    return (
        <motion.article
            key={post.title}
            variants={item}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            <Link href={`/posts/${post.slug}`}>
                <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                    {postImage ? (
                        <ArticleImage src={postImage} alt={post.title}/>
                    ) : (
                        <FallbackGradient/>
                    )}
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.description}
                    </p>
                    <ArticleCardAuthor post={post} />
                </div>
            </Link>
        </motion.article>
    )
}
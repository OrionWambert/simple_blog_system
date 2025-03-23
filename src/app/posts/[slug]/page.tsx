import {Metadata} from "next";
import {fetchPost} from "@/app/actions/post.action";
import {PostContent} from "@/components/content/post_content";
import {Post} from "@/types/post";

export const dynamic = 'force-dynamic'
export const revalidate = 0

type PostPageProps = {
    slug: string
}

export async function generateMetadata({params}: { params: Promise<PostPageProps> }): Promise<Metadata> {
    const {slug} = await params;
    const post: Post = await fetchPost(slug);

    const imageBlock = post.content?.blocks?.find(block => block.type === 'image');
    const featuredImage = imageBlock && 'url' in imageBlock ? imageBlock.url : '/og-image.png';
    const metaDescription = `Article: ${post.title}`;

    return {
        title: post.title,
        description: metaDescription,
        openGraph: {
            type: 'article',
            locale: 'fr_FR',
            url: `/posts/${slug}`,
            title: post.title,
            description: metaDescription,
            siteName: 'Simple Blog System',
            publishedTime: post.createdAt,
            modifiedTime: post.createdAt,
            authors: [post.author?.name || 'Simple Blog System'],
            images: [
                {
                    url: featuredImage,
                    width: 1200,
                    height: 630,
                    alt: post.title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: metaDescription,
            images: [featuredImage]
        }
    };
}

export default async function PostPage({
    params,
}: {
    params: Promise<PostPageProps>
}) {
    const {slug} = await params;
    const post: Post = await fetchPost(slug);
    return <PostContent post={post}/>;
}
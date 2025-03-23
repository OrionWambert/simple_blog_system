import {BlogLayoutProps} from "@/types/post";
import {FeaturedPostContent} from "@/components/molecules/featured-post-content";
import {FeaturedPostDescription} from "@/components/molecules/featured-post-description";
import {NewsLetterCard} from "@/components/molecules/news-letter-card";
import {Gridview} from "@/components/atoms/gridview";
import {ArticleCard} from "@/components/atoms/article-card";

export function BlogLayout({featuredPost, otherPosts}: BlogLayoutProps) {
    return (
        <>
            <section className="relative overflow-hidden bg-black text-white">
                <FeaturedPostContent featuredPost={featuredPost}/>
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-24">
                    <FeaturedPostDescription featuredPost={featuredPost}/>
                </div>
            </section>
            <section className="py-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                            Articles Récents
                        </h2>
                    </div>
                    <Gridview
                    >
                        {otherPosts.map((post) => (
                            <ArticleCard key={post.title} post={post}/>
                        ))}
                    </Gridview>
                </div>
            </section>

            <section className="py-16 bg-white">
                <NewsLetterCard/>
            </section>
        </>
    )
}

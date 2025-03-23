import {HomeContent} from "@/components/content/home_content";
import {fetchPosts} from "@/app/actions/post.action";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const posts = await fetchPosts()
  return <HomeContent posts={posts} />
}

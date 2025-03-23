'use client'

import { BlogLayout } from '@/components/templates'
import {Post} from "@/types/post";

interface HomeContentProps {
  posts: Post[]
}

export function HomeContent({ posts }: HomeContentProps) {
  // TODO return empty post content
  if (posts.length === 0) return null
  
  const [featuredPost, ...otherPosts] = posts

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BlogLayout featuredPost={featuredPost} otherPosts={otherPosts} />
    </main>
  )
}

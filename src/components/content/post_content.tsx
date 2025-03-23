'use client'
import { PostHeader } from './post_header'
import { BlockContent } from '@/components/atoms'
import { CommentSection } from '@/components/organisms'
import { Block } from '@/types/block'

interface PostContentProps {
  post: {
    title: string
    image: string
    createdAt: string
    author: {
      name: string | null
      image: string | null
    }
    content: {
      blocks: Block[]
    }
    comments: Array<{
      id: string
      content: string
      createdAt: string
      author: {
        name: string | null
        image: string | null
        email: string | null
      }
    }>
    slug: string
  }
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <PostHeader
        title={post.title}
        image={post.image}
        createdAt={post.createdAt}
        author={post.author}
      />
      
      <div className="prose prose-lg max-w-none">
        <BlockContent blocks={post.content.blocks} />
      </div>

      <hr className="my-12" />

      <CommentSection comments={post.comments} slug={post.slug} />
    </article>
  )
}

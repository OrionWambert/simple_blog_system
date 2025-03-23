import { Block } from './block'

export interface PostContent {
    blocks: Block[]
}

export interface Comment {
    id: string
    content: string
    createdAt: string
    author: {
        name: string | null
        image: string | null
        email: string | null
    }
}

export interface Author {
    name: string | null
    image: string | null
}

export interface Post {
    title: string
    description: string
    image: string
    createdAt: string
    author: Author
    content: PostContent
    comments: Comment[]
    slug: string
}

export interface BlogLayoutProps {
    featuredPost: Post
    otherPosts: Post[]
}

// Props types
export interface PostProps {
    post: Post
}

export interface PostAuthorProps {
    author: string
    date: string
}

export interface PostHeaderProps {
    title: string
    author: Author
    date: string
}

export interface PostContentProps {
    post: Post
}

export interface PostTitleProps {
    title: string
    slug: string
}

export interface PostDescriptionProps {
    description: string
}
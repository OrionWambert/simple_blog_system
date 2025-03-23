'use server'

import {prisma} from '@/lib/prisma'
import {notFound} from 'next/navigation'
import {Post, PostContent} from "@/types/post";

const defaultContent: PostContent = {
    blocks: []
}

function isPostContent(value: unknown): value is PostContent {
    return (
        value !== null &&
        typeof value === 'object' &&
        'blocks' in value &&
        Array.isArray((value as PostContent).blocks) &&
        (value as PostContent).blocks.every(block =>
            typeof block === 'object' &&
            block !== null &&
            'type' in block &&
            typeof block.type === 'string'
        )
    );
}

export async function fetchPost(slug: string): Promise<Post> {
    const post = await prisma.post.findUnique({
        where: {
            slug,
            published: true,
        },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
            comments: {
                include: {
                    author: {
                        select: {
                            name: true,
                            image: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    })

    if (!post) {
        notFound()
    }

    let postContent: PostContent;
    try {
        const rawContent = post.content as unknown;
        if (isPostContent(rawContent)) {
            postContent = rawContent;
        } else {
            postContent = defaultContent;
        }
    } catch {
        postContent = defaultContent;
    }

    return {
        title: post.title,
        description: post.description || '',
        image: post.image || '/og-image.png',
        createdAt: post.createdAt.toISOString(),
        author: {
            name: post.author.name,
            image: post.author.image
        },
        content: postContent,
        comments: post.comments.map(comment => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt.toISOString(),
            author: {
                name: comment.author.name,
                image: comment.author.image,
                email: comment.author.email,
            }
        })),
        slug: post.slug
    }
}

export async function fetchPosts() {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        select: {
            id: true,
            title: true,
            description: true,
            content: true,
            image: true,
            slug: true,
            createdAt: true,
            author: {
                select: {
                    name: true,
                    image: true,
                }
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    author: {
                        select: {
                            name: true,
                            image: true,
                            email: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return posts.map((post) => ({
        title: post.title,
        description: post.description || '',
        image: post.image || '/og-image.png',
        createdAt: post.createdAt.toISOString(),
        author: {
            name: post.author.name,
            image: post.author.image
        },
        content: {
            blocks: [
                {
                    type: 'image' as const,
                    url: post.image || '/og-image.png'
                },
                ...(post.content && isPostContent(post.content)
                    ? post.content.blocks
                    : [])
            ]
        },
        comments: post.comments.map(comment => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt.toISOString(),
            author: {
                name: comment.author.name,
                image: comment.author.image,
                email: comment.author.email
            }
        })),
        slug: post.slug
    }))
}
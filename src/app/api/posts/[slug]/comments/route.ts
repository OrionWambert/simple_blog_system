import {NextRequest, NextResponse} from 'next/server'
import {getServerSession} from 'next-auth'
import {authOptions} from '@/lib/auth'
import {prisma} from '@/lib/prisma'

export async function POST(request: NextRequest, {params}: { params: Promise<{ slug: string }> }) {
    console.log('Starting comment creation...');
    try {
        const {slug} = await params;
        console.log('Slug:', slug);
        
        const session = await getServerSession(authOptions)
        console.log('Session:', session ? 'exists' : 'null');

        if (!session?.user?.id) {
            console.log('No user session found');
            return NextResponse.json(
                {error: 'You must be logged in to comment'},
                {status: 401}
            )
        }
        
        const body = await request.json()
        console.log('Request body:', { ...body, content: body.content?.substring(0, 50) + '...' });

        if (!body.content || typeof body.content !== 'string') {
            console.log('Invalid content in request');
            return NextResponse.json(
                {error: 'Content is required'},
                {status: 400}
            )
        }

        const user = await prisma.user.findUnique({
            where: {id: session.user.id},
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        })
        console.log('User found:', user ? 'yes' : 'no');

        if (!user) {
            console.log('Creating new user...');
            try {
                await prisma.user.create({
                    data: {
                        id: session.user.id,
                        name: session.user.name || '',
                        email: session.user.email || '',
                        image: session.user.image || ''
                    }
                })
                console.log('User created successfully');
            } catch (error) {
                console.error('Failed to create user:', error);
                return NextResponse.json(
                    {error: 'Failed to create user account'},
                    {status: 500}
                )
            }
        }

        const post = await prisma.post.findUnique({
            where: {slug}
        })
        console.log('Post found:', post ? 'yes' : 'no');
        
        if (!post) {
            console.log('Post not found for slug:', slug);
            return NextResponse.json(
                {error: 'Post not found'},
                {status: 404}
            )
        }

        console.log('Creating comment...');
        const comment = await prisma.comment.create({
            data: {
                content: body.content,
                post: {
                    connect: {id: post.id}
                },
                author: {
                    connect: {id: session.user.id}
                }
            },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                        email: true
                    }
                }
            }
        })
        console.log('Comment created successfully');

        return NextResponse.json({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt.toISOString(),
            author: {
                name: comment.author.name,
                image: comment.author.image,
                email: comment.author.email
            }
        }, {
            status: 201
        })
    } catch (error) {
        console.error('Error in POST /api/posts/[slug]/comments:', error);
        return NextResponse.json(
            {error: error instanceof Error ? error.message : 'Failed to create comment'},
            {status: 500}
        )
    }
}

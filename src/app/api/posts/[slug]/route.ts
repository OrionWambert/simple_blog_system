import {NextResponse} from 'next/server'
import {getServerSession} from 'next-auth'
import {prisma} from '@/lib/prisma'
import {authOptions} from '@/lib/auth'

export async function PATCH(
    request: Request,
    {params}: { params: Promise<{ slug: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return new NextResponse('Unauthorized', {status: 401})
    }

    try {
        const body = await request.json()
        const {published} = body
        const {slug} = await params;
        const post = await prisma.post.update({
            where: {
                slug: slug
            },
            data: {
                published
            }
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error('Error updating post:', error)
        return new NextResponse('Error updating post', {status: 500})
    }
}

export async function DELETE(
    request: Request,
    {params}: { params: Promise<{ slug: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return new NextResponse('Unauthorized', {status: 401})
    }

    const {slug} = await params;
    try {
        await prisma.post.delete({
            where: {
                slug: slug
            }
        })

        return new NextResponse(null, {status: 204})
    } catch (error) {
        console.error('Error deleting post:', error)
        return new NextResponse('Error deleting post', {status: 500})
    }
}

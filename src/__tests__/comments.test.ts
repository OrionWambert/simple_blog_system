import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest'
import {NextRequest} from 'next/server'
import {POST} from '@/app/api/posts/[slug]/comments/route'
import {getServerSession} from 'next-auth'
import {prisma} from '@/lib/prisma'
import {Role} from "@prisma/client"

interface TestUser {
    name: string | null
    id: string
    image: string | null
    email: string | null
    emailVerified: Date | null
    role: Role
}

interface TestPost {
    id: string
    title: string
    slug: string
    description: string
    image: string
    content: string
    authorId: string
    createdAt: Date
    updatedAt: Date
    published: boolean
}

interface Session {
    user: {
        id: string
        name: string
        email: string
    }
    expires: string
}

interface TestComment {
    id: string
    content: string
    createdAt: Date
    authorId: string
    postId: string
    author: {
        name: string | null
        email: string | null
        image: string | null
    }
}

vi.mock('next-auth')
vi.mock('@/lib/prisma', () => ({
    prisma: {
        post: {
            findUnique: vi.fn()
        },
        user: {
            findUnique: vi.fn()
        },
        comment: {
            create: vi.fn()
        }
    }
}))

const mockedPrisma = vi.mocked(prisma, true)

describe('Comment API', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    test('Should create a comment successfully', async () => {
        const session: Session = {
            user: {
                id: 'user-123',
                name: 'Test User',
                email: 'test@example.com'
            },
            expires: '2026-01-01T00:00:00.000Z'
        }

        vi.mocked(getServerSession).mockResolvedValue(session)

        mockedPrisma.user.findUnique.mockResolvedValue({
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
            image: null,
            emailVerified: null,
            role: 'USER'
        } as TestUser)

        mockedPrisma.post.findUnique.mockResolvedValue({
            id: '1',
            title: 'Test Post',
            slug: 'test-post',
            content: 'Test content',
            description: 'Test description',
            image: 'test.jpg',
            authorId: 'user-123',
            createdAt: new Date(),
            updatedAt: new Date(),
            published: true
        } as TestPost)

        mockedPrisma.comment.create.mockResolvedValue({
            id: 'comment-123',
            content: 'Test comment',
            createdAt: new Date(),
            authorId: 'user-123',
            postId: '1',
            author: {
                name: 'Test User',
                email: 'test@example.com',
                image: null
            }
        } as TestComment)

        const request = new NextRequest('http://localhost:3000/api/posts/test-post/comments', {
            method: 'POST',
            body: JSON.stringify({
                content: 'Test comment'
            })
        })

        const response = await POST(request, {params: Promise.resolve({slug: 'test-post'})})
        expect(response.status).toBe(201)
        
        const data = await response.json()
        expect(data).toEqual(
            expect.objectContaining({
                id: 'comment-123',
                content: 'Test comment'
            })
        )
    })

    test('should return 401 if user is not authenticated', async () => {
        vi.mocked(getServerSession).mockResolvedValue(null)

        const request = new NextRequest('http://localhost:3000/api/posts/test-post/comments', {
            method: 'POST',
            body: JSON.stringify({
                content: 'Test comment'
            })
        })

        const response = await POST(request, {params: Promise.resolve({slug: 'test-post'})})
        expect(response.status).toBe(401)
    })

    test('should return 400 if content is missing', async () => {
        const session: Session = {
            user: {
                id: 'user-123',
                name: 'Test User',
                email: 'test@example.com'
            },
            expires: '2099-01-01T00:00:00.000Z'
        }

        vi.mocked(getServerSession).mockResolvedValue(session)

        const request = new NextRequest('http://localhost:3000/api/posts/test-post/comments', {
            method: 'POST',
            body: JSON.stringify({})
        })

        const response = await POST(request, {params: Promise.resolve({slug: 'test-post'})})
        expect(response.status).toBe(400)
    })

    test('should return 404 if post does not exist', async () => {
        const session: Session = {
            user: {
                id: 'user-123',
                name: 'Test User',
                email: 'test@example.com'
            },
            expires: '2099-01-01T00:00:00.000Z'
        }

        vi.mocked(getServerSession).mockResolvedValue(session)

        mockedPrisma.user.findUnique.mockResolvedValue({
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
            image: null,
            emailVerified: null,
            role: 'USER'
        } as TestUser)
        
        mockedPrisma.post.findUnique.mockResolvedValue(null)

        const request = new NextRequest('http://localhost:3000/api/posts/test-post/comments', {
            method: 'POST',
            body: JSON.stringify({
                content: 'Test comment'
            })
        })

        const response = await POST(request, {params: Promise.resolve({slug: 'test-post'})})
        expect(response.status).toBe(404)
    })
})

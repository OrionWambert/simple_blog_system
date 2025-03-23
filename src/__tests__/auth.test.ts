import { describe, expect, test, vi, beforeEach } from 'vitest'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { JWT } from 'next-auth/jwt'
import { Account, Profile, User, Session } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'
import { Role } from '@prisma/client'

vi.mock('@/lib/prisma', () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
            create: vi.fn()
        }
    }
}))

const mockedPrisma = vi.mocked(prisma, true)

if (!authOptions.callbacks) {
    throw new Error('Auth callbacks are not defined')
}

const {
    signIn = async () => true,
    jwt = async ({ token }) => token,
    session = async ({ session }) => session,
    redirect = async ({ url, baseUrl }) => url.startsWith(baseUrl) ? url : baseUrl
} = authOptions.callbacks

describe('Auth Configuration', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test('Should handle GitHub sign in successfully', async () => {
        const mockUser = {
            id: 'github-123',
            name: 'Test User',
            email: 'test@example.com',
            image: 'https://github.com/test.png',
            emailVerified: new Date(),
            role: 'USER' as Role
        }

        const mockAccount: Account = {
            provider: 'github',
            type: 'oauth',
            providerAccountId: 'github-123',
            access_token: 'mock-token',
            token_type: 'bearer',
            scope: 'read:user,user:email'
        }

        mockedPrisma.user.findUnique.mockResolvedValue(null)
        mockedPrisma.user.create.mockResolvedValue(mockUser)

        const result = await signIn({
            user: mockUser,
            account: mockAccount,
            profile: {} as Profile,
            email: {verificationRequest: false}
        })

        expect(result).toBe(true)
        expect(mockedPrisma.user.create).toHaveBeenCalledWith({
            data: {
                id: mockUser.id,
                name: mockUser.name,
                email: mockUser.email,
                image: mockUser.image
            }
        })
    })

    test('Should not create user if already exists', async () => {
        const mockUser = {
            id: 'github-123',
            name: 'Test User',
            email: 'test@example.com',
            image: 'https://github.com/test.png',
            emailVerified: new Date(),
            role: 'USER' as Role
        }

        const mockAccount: Account = {
            provider: 'github',
            type: 'oauth',
            providerAccountId: 'github-123',
            access_token: 'mock-token',
            token_type: 'bearer',
            scope: 'read:user,user:email'
        }

        mockedPrisma.user.findUnique.mockResolvedValue(mockUser)

        const result = await signIn({
            user: mockUser,
            account: mockAccount,
            profile: {} as Profile,
            email: {verificationRequest: false}
        })

        expect(result).toBe(true)
        expect(mockedPrisma.user.create).not.toHaveBeenCalled()
    })

    test('Should handle JWT callback', async () => {
        const mockUser: User = {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
            image: 'https://example.com/avatar.png'
        }

        const token: JWT = {}

        const result = await jwt({
            token,
            user: mockUser,
            account: null,
            profile: undefined,
            trigger: 'signIn',
            session: null,
            isNewUser: false
        })

        expect(result).toEqual({
            id: mockUser.id,
            email: mockUser.email
        })
    })

    test('Should handle session callback', async () => {
        const token: JWT = {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User'
        }

        const mockSession: Session = {
            user: {
                id: 'user-123',
                name: 'Test User',
                email: 'test@example.com'
            },
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }

        const mockAdapterUser: AdapterUser = {
            id: 'user-123',
            email: 'test@example.com',
            emailVerified: null,
            name: 'Test User',
            image: null
        }

        const result = await session({
            session: mockSession,
            token,
            user: mockAdapterUser,
            newSession: null,
            trigger: 'update'
        })

        expect(result.user).toEqual({
            name: 'Test User',
            id: token.id,
            email: token.email
        })
    })

    test('Should handle redirect callback', async () => {
        const baseUrl = 'http://localhost:3000'
        
        let result = await redirect({
            url: '/dashboard',
            baseUrl
        })
        expect(result).toBe(`${baseUrl}/dashboard`)

        result = await redirect({
            url: `${baseUrl}/profile`,
            baseUrl
        })
        expect(result).toBe(`${baseUrl}/profile`)

        result = await redirect({
            url: 'https://evil.com',
            baseUrl
        })
        expect(result).toBe(baseUrl)
    })
})

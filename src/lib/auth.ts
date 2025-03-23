import {NextAuthOptions} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {prisma} from './prisma'

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            authorization: {
                params: {
                    scope: 'read:user user:email'
                }
            },
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({user, account}) {
            if (account?.provider === 'github') {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: {id: user.id}
                    })

                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                image: user.image,
                            }
                        })
                    }
                    return true
                } catch (error) {
                    console.error('Error in signIn callback:', error)
                    return false
                }
            }
            return true
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.email = token.email
            }
            return session
        },
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
                token.email = user.email
            }
            return token
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith('/')) {
                url = `${baseUrl}${url}`
            }
            return url.startsWith(baseUrl) ? url : baseUrl
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: false,
}

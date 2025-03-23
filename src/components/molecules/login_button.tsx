'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/atoms'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms'

export function LoginButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={session.user?.image ?? undefined} />
                        <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{session.user?.name}</span>
                </div>
                <Button variant="outline" onClick={() => signOut()}>
                    Se déconnecter
                </Button>
            </div>
        )
    }

    return (
        <Button onClick={() => signIn()}>
            Se connecter pour commenter
        </Button>
    )
}

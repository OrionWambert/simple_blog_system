'use client'

import {signIn, signOut, useSession} from 'next-auth/react'
import Link from 'next/link'
import Image from "next/image";

export function NavbarAuth() {
    const {data: session} = useSession()

    if (!session) {
        return (
            <button
                onClick={() => signIn()}
                className="text-sm text-gray-600 hover:text-gray-900"
            >
                Connexion
            </button>
        )
    }

    return (
        <div className="flex items-center gap-4">
            {session.user?.image && (
                <Image
                    objectFit={'cover'}
                    unoptimized={true}
                    height={0}
                    width={0}
                    src={session.user.image}
                    alt={session.user.name || ''}
                    className="w-8 h-8 rounded-full"
                />
            )}
            <button
                onClick={() => signOut()}
                className="text-sm text-gray-600 hover:text-gray-900"
            >
                Déconnexion
            </button>
        </div>
    )
}

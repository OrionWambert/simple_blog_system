'use client'

import {SocialLoginButton} from "@/components/atoms/social-login-button";
import {FaGithub} from "react-icons/fa";
import {useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";


export function SignInButtonGroup() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'


    const signWithGithub = async () => {
        await signIn('github', {callbackUrl})
    }

    return (
        <div className="mt-10 space-y-4">
            <SocialLoginButton
                title={"Continuer avec GitHub"}
                icon={
                    <FaGithub className="w-5 h-5"/>
                }
                className={"bg-gray-900 hover:bg-gray-800"}
                onClick={signWithGithub}
            />
        </div>
    )
}
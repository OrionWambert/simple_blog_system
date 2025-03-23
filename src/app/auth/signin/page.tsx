import {AppLogo} from "@/components/atoms/app-logo";
import Center from "@/components/atoms/center";
import {LoginCardDescription} from "@/components/molecules/login-card-description";
import {SignInButtonGroup} from "@/components/molecules/sign-in-button-group";
import {PrivacyPolicyCard} from "@/components/molecules/privacy-policy-card";
import {LoginLayout} from "@/components/templates/login-layout";
import {LoginContent} from "@/components/content/login-content";
import {Suspense} from "react";

export default function SignIn() {
    return (
        <LoginContent>
            <LoginLayout>
                <Center>
                    <AppLogo/>
                </Center>
                <LoginCardDescription/>
                <Suspense>
                    <SignInButtonGroup/>
                </Suspense>
                <PrivacyPolicyCard/>
            </LoginLayout>
        </LoginContent>
    )
}

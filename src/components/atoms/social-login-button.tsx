import {Button} from "@/components/atoms/button";
import {ReactNode} from "react";
import {clsx} from "clsx";

type SocialLoginButtonProps = {
    onClick: () => void;
    title: string
    icon: ReactNode,
    className?: string
}

//bg-gray-900 hover:bg-gray-800
export function SocialLoginButton({onClick, title, icon, className}: SocialLoginButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={clsx("w-full flex items-center justify-center gap-3  transform transition-all hover:translate-y-[-2px] duration-200", className)}
        >
            {icon}
            <span>{title}</span>
        </Button>
    )
}
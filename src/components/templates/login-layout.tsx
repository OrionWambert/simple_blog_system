import {PropsWithChildren} from "react";

export function LoginLayout({children}: PropsWithChildren) {
    return (
        <div
            className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl transform transition-all hover:scale-[1.01] duration-300">
            {children}
        </div>
    )
}
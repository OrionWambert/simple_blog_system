import {PropsWithChildren} from "react";


export function LoginContent({children}:PropsWithChildren) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            {children}
        </div>

    )
}
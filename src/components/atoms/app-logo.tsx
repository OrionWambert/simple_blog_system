import Image from "next/image";


export function AppLogo() {
    return (
        <Image
            src="/next.svg"
            alt="Logo"
            width={100}
            height={100}
        />
    )
}
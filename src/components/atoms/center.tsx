import {PropsWithChildren} from "react";


export default function Center({children}: PropsWithChildren) {
    return (
        <div className={"flex items-center w-full justify-center"}>
            {children}
        </div>
    )
}
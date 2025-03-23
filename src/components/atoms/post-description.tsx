import {PostDescriptionProps} from "@/types/post";

export function PostDescription({description}: PostDescriptionProps) {
    return <p className={"mt-2 text-sm line-clamp-3"}>
        <span>
        {description}
    </span>
    </p>
}


import {PostAuthorProps} from "@/types/post";

export function PostAuthor({author, date}: PostAuthorProps) {
    return <span className={"text-sm"}>
            {date} par <span className={"font-bold"}>{author}</span>
        </span>
        ;
}


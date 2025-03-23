import {PostTitleProps} from "@/types/post";
import Link from "next/link";


export function PostTitle({title, slug}: PostTitleProps) {
    return (
        <h2 className={"text-2xl font-bold cursor-pointer"}>
            <Link href={`/posts/${slug}`}>{title}</Link>
        </h2>
    );
}


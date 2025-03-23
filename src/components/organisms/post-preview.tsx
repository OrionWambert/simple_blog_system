import {PostDescription, PostTitle} from "@/components/atoms";
import {PostAuthor} from "@/components/molecules";
import {PostProps} from "@/types/post";

export function PostPreview({post}: PostProps) {
    return <>
        <PostTitle   slug={post.slug} title={post.title}/>
        <PostAuthor author={post.author.name?? ""} date={post.createdAt.toString()}/>
        <PostDescription description={post.description}/>
    </>
}
import {Post} from "@/types/post";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/avatar";
import {format} from "date-fns";
import {fr} from "date-fns/locale";


export function ArticleCardAuthor({post}: { post: Post }) {
    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-gray-100">
                <AvatarImage src={post.author.image ?? undefined}/>
                <AvatarFallback>{post.author.name?.[0] ?? 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {post.author.name}
                        </span>
                <time className="text-xs text-gray-500">
                    {format(new Date(post.createdAt), 'PPP', {locale: fr})}
                </time>
            </div>
        </div>

    )
}
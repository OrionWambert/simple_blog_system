'use client'

import { useSession, signIn } from 'next-auth/react'
import { Button } from "@/components/atoms"
import { Textarea } from "@/components/atoms"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms"
import { useState } from 'react'
import {MoonLoader} from "react-spinners";

type Comment = {
  id: string
  content: string
  createdAt: string
  author: {
    name: string | null
    image: string | null
    email: string | null
  }
}

type CommentSectionProps = {
  comments: Comment[]
  slug: string
}

export function CommentSection({ comments: initialComments, slug }: CommentSectionProps) {
  const { data: session, status } = useSession()
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/posts/${slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ content: newComment }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to post comment')
      }
      setComments([data, ...comments])
      setNewComment('')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to post comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <div className={"flex items-center justify-center h-full w-full"}>
      <MoonLoader />
    </div>
  }

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Commentaires ({comments.length})</h2>

      {session ? (
        <form onSubmit={handleSubmit} className="mb-12">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="min-h-[100px] mb-4"
          />
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={session.user?.image ?? undefined} />
                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{session.user?.name}</span>
            </div>
            <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? 'Envoi...' : 'Publier le commentaire'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-12 p-6 bg-gray-50 rounded-lg text-center">
          <p className="mb-4 text-gray-600">Connectez-vous pour participer à la discussion</p>
          <Button onClick={() => signIn()}>Login</Button>
        </div>
      )}

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.image ?? undefined} />
              <AvatarFallback>
                {comment.author.name?.[0] ?? 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-gray-500">•</span>
                <time className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

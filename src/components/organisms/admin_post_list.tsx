'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/atoms"
import { Button } from "@/components/atoms"

interface Post {
  id: string
  title: string
  description: string
  published: boolean
  slug: string
}

export function AdminPostList({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePublish = async (slug: string, published: boolean) => {
    setLoading(slug)
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published }),
      })

      if (!response.ok) {
        throw new Error('Failed to update post')
      }

      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('Une erreur est survenue')
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('Une erreur est survenue lors de la suppression')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Articles</h2>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow-sm flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">
                <Link
                  href={`/admin/posts/${post.slug}/edit`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mt-1">{post.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.published ? 'Publié' : 'Brouillon'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={post.published ? "secondary" : "default"}
                size="sm"
                onClick={() => handlePublish(post.slug, !post.published)}
                disabled={loading === post.slug}
              >
                {loading === post.slug ? (
                  "Chargement..."
                ) : post.published ? (
                  "Dépublier"
                ) : (
                  "Publier"
                )}
              </Button>

              <Link href={`/admin/posts/${post.slug}/edit`}>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Cela supprimera définitivement votre article.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(post.slug)}>
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">Aucun article pour le moment</p>
            <Link href="/admin/posts/new" className="text-blue-600 hover:underline mt-2 inline-block">
              Créer votre premier article
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

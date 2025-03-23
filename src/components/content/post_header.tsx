'use client'

import { HeroImage } from '@/components/atoms'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Image from "next/image";

interface PostHeaderProps {
  title: string
  image: string
  createdAt: string
  author: {
    name: string | null
    image: string | null
  }
}

export function PostHeader({ title, image, createdAt, author }: PostHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center gap-4 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          {author.image && (
            <Image
                height={6}
                width={6}
              src={author.image}
              alt={author.name || 'Author'}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span>{author.name}</span>
        </div>
        <time>
          {format(new Date(createdAt), 'dd MMMM yyyy', { locale: fr })}
        </time>
      </div>
      <HeroImage src={image} alt={title} />
    </header>
  )
}

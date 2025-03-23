import Image from 'next/image'
import { Block, ListStyle } from '@/types/block'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FallbackGradient } from '@/components/atoms/fallback-gradient'
import { CodeBlock } from './code-block'

function PostImage({ url, caption }: { url: string; caption?: string }) {
  const [error, setError] = useState(false)

  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        {error ? (
          <FallbackGradient />
        ) : (
          <Image
            src={url}
            alt={caption || ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            onError={() => setError(true)}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function HeadingBlock({ content }: { content: string }) {
  return (
    <h1 className="text-4xl font-bold mb-6 text-gray-900">
      {content}
    </h1>
  )
}

export function SubheadingBlock({ content }: { content: string }) {
  return (
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
      {content}
    </h2>
  )
}

export function ParagraphBlock({ content }: { content: string }) {
  return (
    <p className="text-lg leading-relaxed mb-6 text-gray-700">
      {content}
    </p>
  )
}

export function ImageBlock({ url, caption }: { url: string; caption?: string }) {
  return <PostImage url={url} caption={caption} />
}

export function QuoteBlock({ content, author }: { content: string; author?: string }) {
  return (
    <blockquote className="my-8 border-l-4 border-gray-300 pl-6">
      <p className="text-xl italic text-gray-700 mb-2">{content}</p>
      {author && (
        <footer className="text-sm text-gray-600">
          — {author}
        </footer>
      )}
    </blockquote>
  )
}

export function ListBlock({ items, style }: { items: string[]; style: ListStyle }) {
  const ListComponent = style === 'ordered' ? 'ol' : 'ul'
  const listStyles = cn(
    "my-6 ml-6 space-y-2",
    style === 'ordered' ? "list-decimal" : "list-disc"
  )

  return (
    <ListComponent className={listStyles}>
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">
          {item}
        </li>
      ))}
    </ListComponent>
  )
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock content={block.content} />
    case 'subheading':
      return <SubheadingBlock content={block.content} />
    case 'paragraph':
    case 'text':
      return <ParagraphBlock content={block.content} />
    case 'image':
      return <ImageBlock url={block.url} caption={block.caption} />
    case 'quote':
      return <QuoteBlock content={block.content} author={block.author} />
    case 'list':
      return <ListBlock items={block.items} style={block.style} />
    case 'code':
      return <CodeBlock content={block.content} language={block.language} />
    default:
      return null
  }
}

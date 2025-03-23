import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  content: string
  language?: string
}

export function CodeBlock({ content, language = 'javascript' }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [content, language])

  return (
    <div className="relative my-6 group">
      <pre className="bg-gray-900 rounded-lg overflow-x-auto p-4">
        <code
          ref={codeRef}
          className={cn(
            'text-sm font-mono text-gray-100',
            language && `language-${language}`
          )}
        >
          {content}
        </code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(content)}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copier le code"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
    </div>
  )
}

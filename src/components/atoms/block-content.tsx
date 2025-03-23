'use client'

import React from 'react'
import { BlockRenderer } from "@/components/blocks/default-block"
import { Block } from '@/types/block'

interface BlockContentProps {
  blocks: Block[]
}

export function BlockContent({ blocks }: BlockContentProps) {


  return (
    <div className="prose max-w-none">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  )
}

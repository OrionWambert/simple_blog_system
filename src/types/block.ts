export type ListStyle = 'ordered' | 'unordered'

export type BaseBlock = {
    id?: string
}

export type HeadingBlock = BaseBlock & {
    type: 'heading'
    content: string
}

export type SubheadingBlock = BaseBlock & {
    type: 'subheading'
    content: string
}

export type ParagraphBlock = BaseBlock & {
    type: 'paragraph'
    content: string
}

export type TextBlock = BaseBlock & {
    type: 'text'
    content: string
}
export type ImageBlock = BaseBlock & {
    type: 'image'
    url: string
    content?: string
    caption?: string
}

export type QuoteBlock = BaseBlock & {
    type: 'quote'
    content: string
    author?: string
}

export type ListBlock = BaseBlock & {
    type: 'list'
    style: ListStyle
    items: string[]
}

export type CodeBlock = BaseBlock & {
    type: 'code'
    content: string
    language?: string
}

export type Block =
    | HeadingBlock
    | SubheadingBlock
    | ParagraphBlock
    | ImageBlock
    | QuoteBlock
    | ListBlock
    | CodeBlock
    | TextBlock

export type BlockType = Block['type']

export interface PostContent {
    blocks: Block[]
}

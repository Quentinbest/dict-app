import { useState } from 'react'
import { DictSectionHeader } from './DictSectionHeader'
import { MddImage } from './MddImage'

export interface DictResult {
  dictId: string
  name: string
  badgeColor: string
  html: string
  mddPath?: string
}

interface DictScrollAreaProps {
  scrollRef: React.MutableRefObject<Record<string, HTMLDivElement | null>>
  results: DictResult[]
  loading: boolean
  word: string
}

export function DictScrollArea({ scrollRef, results, loading, word }: DictScrollAreaProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleCollapsed = (dictId: string) => {
    setCollapsed(prev => ({ ...prev, [dictId]: !prev[dictId] }))
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0">
        <span className="text-def-body text-text-secondary">查询中…</span>
      </div>
    )
  }

  if (!loading && results.length === 0 && word) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0">
        <span className="text-def-body text-text-secondary">未找到「{word}」的释义</span>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="flex flex-col pb-16">
        {results.map(block => (
          <div
            key={block.dictId}
            ref={el => { scrollRef.current[block.dictId] = el }}
          >
            <DictSectionHeader
              name={block.name}
              badgeColor={block.badgeColor}
              collapsed={!!collapsed[block.dictId]}
              onToggle={() => toggleCollapsed(block.dictId)}
            />
            {!collapsed[block.dictId] && (
              <MddImage html={block.html} mddPath={block.mddPath} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

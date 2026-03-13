import { useRef } from 'react'
import { WordHeader } from '../content/WordHeader'
import { DictScrollArea } from '../content/DictScrollArea'
import type { DictResult } from '../content/DictScrollArea'
import { FeedbackFAB } from '../shared/FeedbackFAB'

interface MainContentProps {
  word: string
  isStarred: boolean
  onStarChange: (v: boolean) => void
  onScrollToDictRef: React.MutableRefObject<(key: string) => void>
  results: DictResult[]
  loading: boolean
}

export function MainContent({ word, isStarred, onStarChange, onScrollToDictRef, results, loading }: MainContentProps) {
  const dictRefs = useRef<Record<string, HTMLDivElement | null>>({})

  onScrollToDictRef.current = (key: string) => {
    dictRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToDict = (dictId: string) => {
    dictRefs.current[dictId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex-1 flex flex-col bg-bg-app relative min-h-0">
      <WordHeader word={word} isStarred={isStarred} onStarChange={onStarChange} />
      <DictScrollArea scrollRef={dictRefs} results={results} loading={loading} word={word} />
      <FeedbackFAB results={results} onScrollToDict={scrollToDict} />
    </div>
  )
}

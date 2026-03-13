import { Icon } from '@iconify/react'
import type { DictResult } from '../content/DictScrollArea'
import { SidebarWordItem } from './SidebarWordItem'
import { SidebarDictItem } from './SidebarDictItem'

interface SidebarTreeProps {
  currentWord: string
  dictResults: DictResult[]
  suggestions: string[]
  onScrollToDict: (key: string) => void
  onWordSelect: (word: string) => void
}

export function SidebarTree({ currentWord, dictResults, suggestions, onScrollToDict, onWordSelect }: SidebarTreeProps) {
  // Exclude the current word itself from the suggestion list
  const otherSuggestions = suggestions.filter(w => w.toLowerCase() !== currentWord.toLowerCase())

  return (
    <div className="flex flex-col">
      {/* Section header */}
      <div className="flex items-center gap-2 px-3 py-[5px]">
        <Icon icon="heroicons:chevron-down" className="w-3 h-3 text-icon-default flex-shrink-0" />
        <span className="text-sidebar font-semibold text-text-secondary">单词搜索</span>
      </div>

      {/* Selected word */}
      <div className="px-2">
        <SidebarWordItem
          label={currentWord}
          selected
          onClick={() => {}}
        />
      </div>

      {/* Dict source items (scroll anchors) */}
      <div className="flex flex-col pl-4">
        {dictResults.map(block => (
          <SidebarDictItem
            key={block.dictId}
            label={block.name}
            badgeColor={block.badgeColor}
            onClick={() => onScrollToDict(block.dictId)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="mx-4 my-2 h-px bg-divider" />

      {/* Dynamic prefix suggestions */}
      <div className="px-2 flex flex-col">
        {otherSuggestions.map(word => (
          <SidebarWordItem
            key={word}
            label={word}
            onClick={() => onWordSelect(word)}
          />
        ))}
      </div>
    </div>
  )
}

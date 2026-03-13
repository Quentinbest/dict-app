import type { DictResult } from '../content/DictScrollArea'
import { SidebarSearchSection } from '../sidebar/SidebarSearchSection'
import { SidebarTree } from '../sidebar/SidebarTree'

interface SidebarProps {
  searchValue: string
  currentWord: string
  showTree: boolean
  dictResults: DictResult[]
  suggestions: string[]
  onSearchChange: (v: string) => void
  onSearchSubmit: (v: string) => void
  onSearchClear: () => void
  onScrollToDict: (key: string) => void
  onWordSelect: (word: string) => void
}

export function Sidebar({
  searchValue,
  currentWord,
  showTree,
  dictResults,
  suggestions,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  onScrollToDict,
  onWordSelect,
}: SidebarProps) {
  return (
    <div className="flex flex-col w-full bg-bg-sidebar h-full overflow-hidden">
      <SidebarSearchSection
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        onClear={onSearchClear}
      />
      <div className="flex-1 overflow-y-auto min-h-0">
        {showTree && (
          <SidebarTree
            currentWord={currentWord}
            dictResults={dictResults}
            suggestions={suggestions}
            onScrollToDict={onScrollToDict}
            onWordSelect={onWordSelect}
          />
        )}
        {!showTree && (
          <div className="flex items-center gap-2 px-3 py-[5px]">
            <span className="text-sidebar font-semibold text-text-secondary">单词搜索</span>
          </div>
        )}
      </div>
    </div>
  )
}

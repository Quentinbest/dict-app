import { ToolbarButton } from '../toolbar/ToolbarButton'
import { NavArrow } from '../toolbar/NavArrow'
import type { ActiveTab } from '../../types'

interface ToolbarProps {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
  onBack?: () => void
}

const TABS: { key: ActiveTab; label: string; icon: string }[] = [
  { key: 'dict',       label: '词典',   icon: 'heroicons:book-open' },
  { key: 'baike',      label: '百科',   icon: 'heroicons:globe-alt' },
  { key: 'translate',  label: '翻译写作', icon: 'heroicons:language' },
  { key: 'vocabulary', label: '生词笔记', icon: 'heroicons:document-text' },
  { key: 'memorize',   label: '背单词',  icon: 'heroicons:academic-cap' },
  { key: 'manage',     label: '管理',   icon: 'heroicons:squares-2x2' },
]

export function Toolbar({ activeTab, onTabChange, onBack }: ToolbarProps) {
  return (
    <div className="flex items-center h-16 bg-bg-toolbar border-b border-divider flex-shrink-0">
      {/* Center tab buttons */}
      <div className="flex items-center flex-1 justify-center">
        {TABS.map(tab => (
          <ToolbarButton
            key={tab.key}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.key}
            onClick={() => onTabChange(tab.key)}
          />
        ))}
      </div>

      {/* Right nav group */}
      <div className="flex items-center gap-2 pr-4 flex-shrink-0">
        <NavArrow direction="back" disabled={activeTab === 'dict'} onClick={onBack} />
        <NavArrow direction="forward" disabled />
        <div className="w-px h-5 bg-divider mx-1" />
        <button className="no-drag text-sidebar text-text-secondary hover:text-text-primary transition-colors">
          历史记录
        </button>
        <button className="no-drag text-sidebar text-text-secondary hover:text-text-primary transition-colors ml-2">
          标签
        </button>
      </div>
    </div>
  )
}

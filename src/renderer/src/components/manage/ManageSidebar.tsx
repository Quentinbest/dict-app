interface Category {
  key: string
  label: string
}

const CATEGORIES: Category[] = [
  { key: 'installed', label: '已安装词库' },
  { key: 'pronunciation', label: '发音库' },
  { key: 'mouse', label: '鼠标取词词库' },
  { key: 'download', label: '下载更多词库' },
]

interface ManageSidebarProps {
  selected: string
  onSelect: (key: string) => void
}

export function ManageSidebar({ selected, onSelect }: ManageSidebarProps) {
  return (
    <div className="flex flex-col w-full bg-bg-sidebar h-full overflow-hidden">
      <div className="px-4 py-3 border-b border-divider">
        <span className="text-sidebar text-text-secondary">词典库 (可在此调整词典库顺序)</span>
      </div>
      <div className="flex flex-col py-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`no-drag w-full text-left px-4 py-2 text-sidebar transition-colors ${
              selected === cat.key
                ? 'bg-bg-sidebar-selected text-white'
                : 'text-text-primary hover:bg-bg-sidebar-hover'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

import { Icon } from '@iconify/react'

interface ManageActionBarProps {
  filterQuery: string
  onFilterChange: (q: string) => void
  onInstall: () => void
}

export function ManageActionBar({ filterQuery, onFilterChange, onInstall }: ManageActionBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-divider bg-bg-app flex-shrink-0">
      <button
        onClick={onInstall}
        className="no-drag flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-input text-text-primary text-sidebar hover:bg-bg-sidebar-hover transition-colors"
      >
        <Icon icon="heroicons:plus" className="w-3.5 h-3.5" />
        安装本地词
      </button>
      <button disabled className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-input text-text-secondary text-sidebar opacity-40 cursor-not-allowed">
        <Icon icon="heroicons:plus" className="w-3.5 h-3.5" />
        编辑词典库分组
      </button>
      <button disabled className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-input text-text-secondary text-sidebar opacity-40 cursor-not-allowed">
        <Icon icon="heroicons:arrow-path" className="w-3.5 h-3.5" />
        备份 / 恢复词库配置
      </button>
      <div className="flex-1" />
      <div className="no-drag flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-input w-44">
        <Icon icon="heroicons:magnifying-glass" className="w-3.5 h-3.5 text-icon-default flex-shrink-0" />
        <input
          type="text"
          value={filterQuery}
          onChange={e => onFilterChange(e.target.value)}
          placeholder="搜索词典库"
          className="bg-transparent text-sidebar text-text-primary placeholder:text-text-secondary outline-none flex-1 min-w-0"
        />
      </div>
    </div>
  )
}

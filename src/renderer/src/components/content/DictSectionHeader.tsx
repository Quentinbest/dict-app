import { Icon } from '@iconify/react'

interface DictSectionHeaderProps {
  name: string
  badgeColor: string
  collapsed: boolean
  onToggle: () => void
}

export function DictSectionHeader({ name, badgeColor, collapsed, onToggle }: DictSectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 h-9 border-t border-divider">
      {/* Collapse toggle button */}
      <button
        onClick={onToggle}
        className="no-drag w-5 h-5 flex items-center justify-center text-icon-default hover:text-text-primary transition-colors flex-shrink-0 rounded hover:bg-bg-sidebar-hover"
        title={collapsed ? '展开' : '折叠'}
      >
        <Icon
          icon={collapsed ? 'heroicons:chevron-right' : 'heroicons:chevron-down'}
          className="w-3 h-3"
        />
      </button>

      {/* Badge dot */}
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: badgeColor }}
      />

      {/* Dict name */}
      <span className="text-dict-hdr font-semibold text-text-heading flex-1 truncate">{name}</span>
    </div>
  )
}

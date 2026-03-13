interface SidebarDictItemProps {
  label: string
  badgeColor: string
  onClick?: () => void
}

export function SidebarDictItem({ label, badgeColor, onClick }: SidebarDictItemProps) {
  return (
    <button
      onClick={onClick}
      className="no-drag w-full flex items-center gap-[6px] pl-5 pr-2 py-1 text-left hover:text-text-primary group transition-colors"
    >
      <span
        className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: badgeColor }}
      />
      <span className="text-sidebar-sm text-text-secondary group-hover:underline truncate">
        {label}
      </span>
    </button>
  )
}

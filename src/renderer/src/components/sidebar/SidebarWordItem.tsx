interface SidebarWordItemProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export function SidebarWordItem({ label, selected = false, onClick }: SidebarWordItemProps) {
  return (
    <button
      onClick={onClick}
      className={`no-drag w-full flex items-center gap-2 px-3 py-[5px] rounded text-left text-sidebar transition-colors ${
        selected
          ? 'bg-bg-sidebar-selected text-white'
          : 'text-text-primary hover:bg-bg-sidebar-hover'
      }`}
    >
      <span className="text-[11px] opacity-60 flex-shrink-0">📄</span>
      <span className="truncate">{label}</span>
    </button>
  )
}

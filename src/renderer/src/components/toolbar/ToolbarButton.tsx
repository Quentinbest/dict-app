import { Icon } from '@iconify/react'

interface ToolbarButtonProps {
  label: string
  icon: string
  active?: boolean
  onClick?: () => void
}

export function ToolbarButton({ label, icon, active = false, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`no-drag relative w-[72px] h-14 flex flex-col items-center justify-center gap-1 rounded transition-colors ${
        active ? '' : 'hover:bg-bg-sidebar-hover'
      }`}
    >
      <Icon
        icon={icon}
        className="w-6 h-6"
        style={{ color: active ? '#569CD6' : '#9E9E9E' }}
      />
      <span
        className="text-toolbar"
        style={{ color: active ? '#D4D4D4' : '#9E9E9E' }}
      >
        {label}
      </span>
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue" />
      )}
    </button>
  )
}

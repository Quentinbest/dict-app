import { Icon } from '@iconify/react'

interface NavArrowProps {
  direction: 'back' | 'forward'
  disabled?: boolean
  onClick?: () => void
}

export function NavArrow({ direction, disabled = false, onClick }: NavArrowProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`no-drag w-7 h-7 flex items-center justify-center rounded ${
        disabled
          ? 'cursor-default'
          : 'hover:bg-bg-sidebar-hover transition-colors cursor-pointer'
      }`}
    >
      <Icon
        icon={direction === 'back' ? 'heroicons:chevron-left' : 'heroicons:chevron-right'}
        className="w-[18px] h-[18px]"
        style={{ color: disabled ? '#4A4A4A' : '#9E9E9E' }}
      />
    </button>
  )
}

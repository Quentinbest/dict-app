import { useState } from 'react'
import { Icon } from '@iconify/react'

interface StarToggleProps {
  initialFilled?: boolean
  onChange?: (filled: boolean) => void
}

export function StarToggle({ initialFilled = false, onChange }: StarToggleProps) {
  const [filled, setFilled] = useState(initialFilled)

  const handleClick = () => {
    const next = !filled
    setFilled(next)
    onChange?.(next)
  }

  return (
    <button
      onClick={handleClick}
      className="no-drag flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center hover:opacity-80 transition-opacity"
    >
      <Icon
        icon={filled ? 'heroicons:star-solid' : 'heroicons:star'}
        className="w-4 h-4"
        style={{ color: filled ? '#E8A838' : '#9E9E9E' }}
      />
    </button>
  )
}

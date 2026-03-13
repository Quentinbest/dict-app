import { useRef } from 'react'
import { Icon } from '@iconify/react'

interface SearchBarProps {
  value: string
  placeholder?: string
  onChange: (v: string) => void
  onFocus?: () => void
  onSubmit?: (v: string) => void
  onClear?: () => void
  showBorder?: boolean
}

export function SearchBar({
  value,
  placeholder = '搜索',
  onChange,
  onFocus,
  onSubmit,
  onClear,
  showBorder = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit?.(value)
      inputRef.current?.blur()
    }
  }

  return (
    <div
      className={`no-drag flex items-center gap-[6px] h-8 px-2 rounded-[6px] bg-bg-input ${
        showBorder ? 'ring-1 ring-accent-blue' : ''
      }`}
    >
      <Icon icon="heroicons:magnifying-glass" className="w-4 h-4 flex-shrink-0 text-icon-default" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-0 bg-transparent text-search text-text-primary placeholder:text-text-secondary outline-none"
      />
      {value && (
        <button
          onClick={onClear}
          className="flex-shrink-0 flex items-center justify-center w-3 h-3 hover:opacity-70"
        >
          <Icon icon="heroicons:x-mark" className="w-3 h-3 text-icon-default" />
        </button>
      )}
    </div>
  )
}

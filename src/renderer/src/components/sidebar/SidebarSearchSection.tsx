import { SearchBar } from '../shared/SearchBar'

interface SidebarSearchSectionProps {
  value: string
  onChange: (v: string) => void
  onSubmit: (v: string) => void
  onClear: () => void
}

export function SidebarSearchSection({ value, onChange, onSubmit, onClear }: SidebarSearchSectionProps) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3 flex-shrink-0">
      <SearchBar
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onClear={onClear}
      />
      <button
        onClick={() => onSubmit(value)}
        className="no-drag w-full h-6 rounded bg-accent-blue text-white text-sidebar font-normal hover:opacity-90 transition-opacity"
      >
        搜索
      </button>
    </div>
  )
}

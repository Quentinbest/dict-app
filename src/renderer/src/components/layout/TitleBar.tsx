import { SearchBar } from '../shared/SearchBar'

interface TitleBarProps {
  searchValue: string
  title: string
  onSearchChange: (v: string) => void
  onSearchFocus: () => void
  onSearchSubmit: (v: string) => void
  onSearchClear: () => void
  showBorder?: boolean
}

export function TitleBar({
  searchValue,
  title,
  onSearchChange,
  onSearchFocus,
  onSearchSubmit,
  onSearchClear,
  showBorder,
}: TitleBarProps) {
  return (
    <div className="drag-region flex items-center h-[38px] bg-bg-titlebar flex-shrink-0 relative">
      {/* Traffic light spacer */}
      <div className="w-[80px] flex-shrink-0" />

      {/* Centered search bar */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[220px]">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onFocus={onSearchFocus}
          onSubmit={onSearchSubmit}
          onClear={onSearchClear}
          showBorder={showBorder}
        />
      </div>

      {/* Title text (center absolute, behind search on small widths) */}
      <div className="flex-1 text-center pointer-events-none">
        <span className="text-titlebar text-text-secondary">{title}</span>
      </div>

      {/* Right: login text */}
      <div className="pr-4 flex-shrink-0">
        <span className="no-drag text-titlebar text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
          登录学习账号
        </span>
      </div>
    </div>
  )
}

import { AUTOCOMPLETE_SUGGESTIONS } from '../../data/wordData'

interface AutocompleteDropdownProps {
  onSelect: (word: string) => void
}

export function AutocompleteDropdown({ onSelect }: AutocompleteDropdownProps) {
  return (
    <div className="absolute top-[38px] left-1/2 -translate-x-1/2 z-50 w-[248px] bg-bg-autocomplete border border-divider rounded-[6px] shadow-xl overflow-hidden">
      {AUTOCOMPLETE_SUGGESTIONS.map((word) => (
        <button
          key={word}
          onClick={() => onSelect(word)}
          className="w-full px-3 py-[6px] text-left text-sidebar text-text-primary hover:bg-bg-sidebar-hover transition-colors flex items-center gap-2"
        >
          <span className="w-3.5 h-3.5 text-icon-default flex-shrink-0">📄</span>
          {word}
        </button>
      ))}
    </div>
  )
}

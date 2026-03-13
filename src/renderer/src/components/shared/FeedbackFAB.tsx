import { useState, useEffect, useRef } from 'react'
import type { DictResult } from '../content/DictScrollArea'

interface FeedbackFABProps {
  results: DictResult[]
  onScrollToDict: (dictId: string) => void
}

export function FeedbackFAB({ results, onScrollToDict }: FeedbackFABProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleSelect = (dictId: string) => {
    setOpen(false)
    onScrollToDict(dictId)
  }

  return (
    <div ref={containerRef} className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
      {/* Quick-nav popup */}
      {open && results.length > 0 && (
        <div className="bg-[#2C2C2C] border border-divider rounded-lg shadow-xl overflow-hidden min-w-[200px] max-w-[280px]">
          <div className="px-3 py-2 border-b border-divider">
            <span className="text-[11px] text-text-secondary font-semibold uppercase tracking-wide">跳转到词典</span>
          </div>
          <div className="flex flex-col py-1 max-h-64 overflow-y-auto">
            {results.map(r => (
              <button
                key={r.dictId}
                onClick={() => handleSelect(r.dictId)}
                className="no-drag flex items-center gap-2.5 px-3 py-2 hover:bg-bg-sidebar-hover transition-colors text-left"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: r.badgeColor }}
                />
                <span className="text-[13px] text-text-primary truncate">{r.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="no-drag w-10 h-10 rounded-full bg-bg-sidebar-hover border border-divider flex items-center justify-center hover:bg-[#4A4A4A] transition-colors shadow-lg"
        title="跳转到词典"
      >
        <span className="text-text-secondary text-[16px] leading-none font-light">?</span>
      </button>
    </div>
  )
}

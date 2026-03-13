import { useState } from 'react'
import { Icon } from '@iconify/react'

function basename(p: string): string {
  return p.split(/[\\/]/).pop() ?? p
}

export interface DictRowItem {
  id: string
  name: string
  description: string
  mdxPath: string
  mddPath?: string
  iconColor: string
  enabled: boolean
  format: string
  encoding?: string
}

interface InstalledDictRowProps {
  dict: DictRowItem
}

export function InstalledDictRow({ dict }: InstalledDictRowProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-divider">
      {/* Main row */}
      <div className="flex items-center gap-3 px-4 py-3 hover:bg-bg-sidebar-hover transition-colors">
        {/* File icon */}
        <div
          className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: dict.iconColor }}
        >
          <Icon icon="heroicons:document-text" className="w-4 h-4 text-white" />
        </div>

        {/* Name + description */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sidebar font-semibold text-text-heading truncate">{dict.name}</span>
          <span className="text-sidebar-sm text-text-secondary truncate">{dict.description}</span>
        </div>

        {/* Enabled badge */}
        {dict.enabled && (
          <span className="flex-shrink-0 text-[11px] text-green-400 border border-green-700 px-1.5 py-0.5 rounded leading-none">
            ✓ 已启用
          </span>
        )}
        {!dict.enabled && (
          <span className="flex-shrink-0 text-[11px] text-text-secondary border border-divider px-1.5 py-0.5 rounded leading-none">
            已禁用
          </span>
        )}

        {/* Info button */}
        <button
          className="no-drag w-6 h-6 flex items-center justify-center text-icon-default hover:text-text-primary flex-shrink-0"
          onClick={() => setExpanded(e => !e)}
          title="详情"
        >
          <Icon icon="heroicons:information-circle" className="w-4 h-4" />
        </button>

        {/* Expand arrow */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="no-drag w-6 h-6 flex items-center justify-center text-icon-default hover:text-text-primary flex-shrink-0"
        >
          <Icon icon={expanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-16 py-3 bg-bg-app flex flex-col gap-2 border-t border-divider">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] bg-bg-input text-text-secondary px-2 py-0.5 rounded">
              格式 Mdict
            </span>
            {dict.mddPath && (
              <span className="text-[11px] bg-bg-input text-text-secondary px-2 py-0.5 rounded truncate max-w-xs">
                扩充 Mdd资源: {basename(dict.mddPath)}
              </span>
            )}
            {dict.encoding && (
              <span className="text-[11px] bg-bg-input text-text-secondary px-2 py-0.5 rounded">
                Encoding:{dict.encoding}
              </span>
            )}
          </div>
          <div className="text-sidebar-sm text-text-secondary break-all">{dict.mdxPath}</div>
        </div>
      )}
    </div>
  )
}

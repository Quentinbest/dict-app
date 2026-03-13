import { useState, useEffect } from 'react'
import { ManageActionBar } from './ManageActionBar'
import { InstalledDictRow } from './InstalledDictRow'
import type { DictRowItem } from './InstalledDictRow'

interface ManageTabProps {
  selectedCategory: string
}

export function ManageTab({ selectedCategory: _selectedCategory }: ManageTabProps) {
  const [filterQuery, setFilterQuery] = useState('')
  const [dicts, setDicts] = useState<DictRowItem[]>([])

  useEffect(() => {
    if (window.dictAPI) {
      window.dictAPI.getAllDicts().then(setDicts).catch(console.error)
    }
  }, [])

  const handleInstall = async () => {
    if (!window.dictAPI) return
    const mdxPath = await window.dictAPI.openMdxFile()
    if (!mdxPath) return
    const dict = await window.dictAPI.installDict(mdxPath)
    setDicts(prev => [...prev, dict])
  }

  const filtered = dicts.filter(d =>
    !filterQuery || d.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(filterQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-bg-app">
      <ManageActionBar
        filterQuery={filterQuery}
        onFilterChange={setFilterQuery}
        onInstall={handleInstall}
      />
      <div className="flex-1 overflow-y-auto min-h-0">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <span className="text-def-body text-text-secondary">
              {dicts.length === 0 ? '点击"安装本地词"添加 MDX 词典' : '无匹配词典'}
            </span>
          </div>
        )}
        {filtered.map(dict => (
          <InstalledDictRow
            key={dict.id}
            dict={dict}
          />
        ))}
      </div>
    </div>
  )
}

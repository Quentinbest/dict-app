import { ipcMain } from 'electron'
import { existsSync } from 'fs'
import { basename, dirname, join } from 'path'
import { parseMdxMeta } from '../lib/mdxParser'
import { loadDicts, saveDicts } from '../lib/dictStore'
import { clearMddCache } from '../lib/mddReader'

const mdxCache = new Map<string, any>()

function getMdxInstance(mdxPath: string): any {
  if (!mdxCache.has(mdxPath)) {
    const { MDX } = require('js-mdict')
    mdxCache.set(mdxPath, new MDX(mdxPath))
  }
  return mdxCache.get(mdxPath)
}

const ICON_COLORS = ['#E06C00', '#0E639C', '#6A9955', '#C586C0', '#569CD6', '#D4762C', '#CE9178', '#4EC9B0', '#9E9E9E']

function genId(): string {
  return `dict_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function registerDictHandlers(): void {
  ipcMain.handle('dict:getAll', () => {
    return loadDicts()
  })

  ipcMain.handle('dict:install', (_event, { mdxPath, mddPath }: { mdxPath: string; mddPath?: string }) => {
    const dicts = loadDicts()

    // Check if already installed
    if (dicts.some((d: any) => d.mdxPath === mdxPath)) {
      return dicts.find((d: any) => d.mdxPath === mdxPath)
    }

    const meta = parseMdxMeta(mdxPath)

    // Auto-detect paired .mdd file in same directory if not provided
    let resolvedMddPath = mddPath
    if (!resolvedMddPath) {
      const dir = dirname(mdxPath)
      const base = basename(mdxPath, '.mdx')
      const autoMdd = join(dir, `${base}.mdd`)
      if (existsSync(autoMdd)) resolvedMddPath = autoMdd
    }

    const dict = {
      id: genId(),
      name: meta.title,
      description: meta.description || (resolvedMddPath
        ? `格式 Mdict  扩充 Mdd资源：${basename(resolvedMddPath, '.mdd')}（MDD 数据文件）`
        : `格式 Mdict  ${basename(mdxPath, '.mdx')}`),
      mdxPath,
      mddPath: resolvedMddPath,
      iconColor: ICON_COLORS[dicts.length % ICON_COLORS.length],
      enabled: true,
      format: 'mdict',
      encoding: meta.encoding,
    }

    dicts.push(dict)
    saveDicts(dicts)
    return dict
  })

  ipcMain.handle('dict:updateMdd', (_event, { id, mddPath }: { id: string; mddPath: string }) => {
    const dicts = loadDicts()
    const idx = dicts.findIndex((d: any) => d.id === id)
    if (idx === -1) return null
    dicts[idx] = { ...dicts[idx], mddPath }
    saveDicts(dicts)
    clearMddCache(dicts[idx].mddPath)
    return dicts[idx]
  })

  ipcMain.handle('dict:toggle', (_event, { id, enabled }: { id: string; enabled: boolean }) => {
    const dicts = loadDicts()
    const idx = dicts.findIndex((d: any) => d.id === id)
    if (idx !== -1) {
      dicts[idx] = { ...dicts[idx], enabled }
      saveDicts(dicts)
    }
  })

  ipcMain.handle('dict:remove', (_event, { id }: { id: string }) => {
    let dicts = loadDicts()
    const removed = dicts.find((d: any) => d.id === id)
    if (removed?.mddPath) clearMddCache(removed.mddPath)
    dicts = dicts.filter((d: any) => d.id !== id)
    saveDicts(dicts)
  })

  ipcMain.handle('dict:reorder', (_event, { orderedIds }: { orderedIds: string[] }) => {
    const dicts = loadDicts()
    const ordered = orderedIds
      .map(id => dicts.find((d: any) => d.id === id))
      .filter(Boolean)
    saveDicts(ordered)
  })

  ipcMain.handle('dict:suggest', (_event, { word }: { word: string }) => {
    if (!word) return []
    const dicts = loadDicts().filter((d: any) => d.enabled)
    const seen = new Set<string>()
    const results: string[] = []

    for (const dict of dicts) {
      try {
        const mdx = getMdxInstance(dict.mdxPath)
        const items: { keyText: string }[] = mdx.prefix(word) ?? []
        for (const item of items) {
          const key = item.keyText
          if (key && !seen.has(key.toLowerCase())) {
            seen.add(key.toLowerCase())
            results.push(key)
          }
        }
      } catch {
        // skip unavailable dict
      }
    }

    return results
  })

  ipcMain.handle('dict:lookup', (_event, { word }: { word: string }) => {
    const dicts = loadDicts().filter((d: any) => d.enabled)
    const results: { dictId: string; name: string; badgeColor: string; html: string; mddPath?: string }[] = []

    for (const dict of dicts) {
      try {
        const mdx = getMdxInstance(dict.mdxPath)
        const item = mdx.lookup(word)
        const html = item?.definition ?? ''
        if (html) {
          results.push({ dictId: dict.id, name: dict.name, badgeColor: dict.iconColor, html, mddPath: dict.mddPath })
        }
      } catch {
        // dict unavailable or word not found — skip
      }
    }

    return results
  })
}

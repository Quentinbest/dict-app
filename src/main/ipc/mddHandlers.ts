import { ipcMain } from 'electron'
import { getMddResource } from '../lib/mddReader'
import { extname } from 'path'

const MIME: Record<string, string> = {
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.bmp':  'image/bmp',
}

export function registerMddHandlers(): void {
  ipcMain.handle('mdd:getImage', (_event, { key, mddPath }: { key: string; mddPath: string }) => {
    const buf = getMddResource(key, mddPath)
    if (!buf) return null
    const ext = extname(key).toLowerCase()
    const mime = MIME[ext] ?? 'image/png'
    return `data:${mime};base64,${buf.toString('base64')}`
  })

  ipcMain.handle('mdd:getText', (_event, { key, mddPath }: { key: string; mddPath: string }) => {
    const buf = getMddResource(key, mddPath)
    if (!buf) return null
    return buf.toString('utf-8')
  })
}

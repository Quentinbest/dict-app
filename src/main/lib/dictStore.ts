import { app } from 'electron'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const STORE_FILENAME = 'installed-dicts.json'

function getStorePath(): string {
  const dir = app.getPath('userData')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return join(dir, STORE_FILENAME)
}

export function loadDicts(): any[] {
  try {
    const path = getStorePath()
    if (!existsSync(path)) return []
    const raw = readFileSync(path, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveDicts(dicts: any[]): void {
  try {
    writeFileSync(getStorePath(), JSON.stringify(dicts, null, 2), 'utf-8')
  } catch (e) {
    console.error('Failed to save dict store:', e)
  }
}

// Cache MDD instances to avoid re-parsing large files on every request
const mddCache = new Map<string, any>()

function getMddInstance(mddPath: string): any {
  if (!mddCache.has(mddPath)) {
    const { MDD } = require('js-mdict')
    mddCache.set(mddPath, new MDD(mddPath))
  }
  return mddCache.get(mddPath)
}

export function getMddResource(key: string, mddPath: string): Buffer | null {
  try {
    const mdd = getMddInstance(mddPath)

    // MDD stores keys with leading backslash; try both variants
    const keys = [key, `\\${key}`, key.replace(/\//g, '\\'), `\\${key.replace(/\//g, '\\')}` ]

    for (const k of keys) {
      try {
        const result = mdd.locate(k)
        if (result?.definition) {
          // MDD.locate() returns definition as a base64-encoded string
          return Buffer.from(result.definition, 'base64')
        }
      } catch {
        // try next key variant
      }
    }
    return null
  } catch {
    return null
  }
}

export function clearMddCache(mddPath?: string) {
  if (mddPath) {
    mddCache.delete(mddPath)
  } else {
    mddCache.clear()
  }
}

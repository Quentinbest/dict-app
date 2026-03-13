import { useState, useEffect } from 'react'
import type { DictResult } from '../components/content/DictScrollArea'

export function useDictLookup(word: string) {
  const [results, setResults] = useState<DictResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!word || !window.dictAPI) {
      setResults([])
      return
    }
    setLoading(true)
    setResults([])
    window.dictAPI.lookupWord(word)
      .then(setResults)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [word])

  return { results, loading }
}

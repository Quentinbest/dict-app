import { useState, useEffect } from 'react'

export function useDictSuggest(word: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (!word || !window.dictAPI) {
      setSuggestions([])
      return
    }
    window.dictAPI.suggestWords(word)
      .then(setSuggestions)
      .catch(() => setSuggestions([]))
  }, [word])

  return suggestions
}

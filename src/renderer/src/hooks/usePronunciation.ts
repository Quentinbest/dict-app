import { useState, useRef, useEffect } from 'react'

export function usePronunciation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsPlaying(true)
    timerRef.current = setTimeout(() => setIsPlaying(false), 1500)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return { isPlaying, handleClick }
}

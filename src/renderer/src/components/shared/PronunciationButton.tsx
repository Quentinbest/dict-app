import { Icon } from '@iconify/react'
import { usePronunciation } from '../../hooks/usePronunciation'

export function PronunciationButton() {
  const { isPlaying, handleClick } = usePronunciation()

  return (
    <button
      onClick={handleClick}
      className={`no-drag flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-colors ${
        isPlaying ? 'bg-bg-sidebar-hover' : 'hover:bg-bg-sidebar-hover'
      }`}
    >
      <Icon
        icon={isPlaying ? 'heroicons:speaker-wave' : 'heroicons:speaker-wave'}
        className="w-[18px] h-[18px] transition-colors"
        style={{ color: isPlaying ? '#569CD6' : '#9E9E9E' }}
      />
    </button>
  )
}

import { StarToggle } from '../shared/StarToggle'
import { Icon } from '@iconify/react'

interface WordHeaderProps {
  word: string
  isStarred: boolean
  onStarChange: (v: boolean) => void
}

export function WordHeader({ word, isStarred, onStarChange }: WordHeaderProps) {
  return (
    <div className="flex-shrink-0 bg-bg-app px-6 pt-5 pb-4 flex flex-col gap-2 border-b border-divider">
      {/* Headword */}
      <div className="text-headword font-bold text-text-heading leading-none">{word}</div>

      {/* Controls row: star favorite + rating stars + global icon */}
      <div className="flex items-center gap-3">
        {/* Favorite toggle */}
        <StarToggle initialFilled={isStarred} onChange={onStarChange} />

        {/* Rating stars (decorative, 4 empty) */}
        <div className="flex items-center gap-0.5">
          {[0, 1, 2, 3].map(i => (
            <Icon key={i} icon="heroicons:star" className="w-3.5 h-3.5 text-text-secondary opacity-40" />
          ))}
        </div>

        {/* Global / all-dict indicator */}
        <div className="flex items-center gap-1 ml-1">
          <Icon icon="heroicons:globe-alt" className="w-3.5 h-3.5 text-icon-default" />
          <span className="text-[12px] text-text-secondary">全球</span>
        </div>
      </div>
    </div>
  )
}

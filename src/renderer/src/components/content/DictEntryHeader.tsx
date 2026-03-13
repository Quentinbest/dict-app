import { StarToggle } from '../shared/StarToggle'
import { PronunciationButton } from '../shared/PronunciationButton'
import { POSTag } from '../shared/POSTag'
import type { DictEntry } from '../../types'

interface DictEntryHeaderProps {
  entry: DictEntry
}

export function DictEntryHeader({ entry }: DictEntryHeaderProps) {
  return (
    <div className="px-6 pt-3 pb-2 flex flex-col gap-2">
      {/* Word + phonetic line */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-[18px] font-bold text-text-orange">{entry.word}</span>
        <StarToggle initialFilled />
        <PronunciationButton />
        <span className="text-phonetic text-text-link-blue">{entry.phoneticBrit} ; {entry.phoneticAm}</span>
        <span className="text-def-body text-text-secondary italic">{entry.pos}</span>
      </div>
      {/* POS tags */}
      <div className="flex items-center gap-1.5">
        <POSTag label="DETERMINER" />
        <POSTag label="PRONOUN" />
        <StarToggle initialFilled />
      </div>
      {/* Plural line */}
      <div className="flex items-center gap-2">
        <span className="text-def-body font-bold text-text-primary">pl.</span>
        <span className="text-def-body font-bold text-text-primary">these</span>
        <span className="text-phonetic text-text-link-blue">/ðiːz ; ðiz/</span>
        <PronunciationButton />
      </div>
      <div className="h-px bg-divider" />
    </div>
  )
}

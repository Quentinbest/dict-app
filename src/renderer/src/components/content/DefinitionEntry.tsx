import { StarToggle } from '../shared/StarToggle'
import { ExampleItem } from './ExampleItem'
import type { Definition } from '../../types'

interface DefinitionEntryProps {
  definition: Definition
}

export function DefinitionEntry({ definition }: DefinitionEntryProps) {
  return (
    <div className="flex flex-col gap-1.5 py-2">
      <div className="flex items-start gap-[6px]">
        <span className="text-def-num font-bold text-text-link-blue flex-shrink-0">
          {definition.number}
        </span>
        <StarToggle />
        <span className="text-def-body text-text-primary">{definition.text}</span>
      </div>
      {definition.examples.length > 0 && (
        <div className="pl-5 flex flex-col gap-1">
          {definition.examples.map((ex, i) => (
            <ExampleItem key={i} en={ex.en} zh={ex.zh} />
          ))}
        </div>
      )}
    </div>
  )
}

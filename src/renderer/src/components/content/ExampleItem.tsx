interface ExampleItemProps {
  en: string
  zh: string
}

export function ExampleItem({ en, zh }: ExampleItemProps) {
  return (
    <div className="flex flex-col gap-[2px]">
      <div className="flex gap-[6px] text-example-en text-text-example-en">
        <span className="flex-shrink-0">○</span>
        <span>{en}</span>
      </div>
      <div className="pl-4 text-example-zh text-text-secondary">{zh}</div>
    </div>
  )
}

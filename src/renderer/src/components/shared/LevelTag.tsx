interface LevelTagProps {
  label: string
}

export function LevelTag({ label }: LevelTagProps) {
  return (
    <span className="inline-flex items-center px-[5px] py-[2px] rounded-[3px] border border-[#5A5A5A] text-[11px] font-normal leading-[14px] text-text-secondary">
      {label}
    </span>
  )
}

interface POSTagProps {
  label: string
}

export function POSTag({ label }: POSTagProps) {
  return (
    <span className="inline-flex items-center px-[6px] py-[2px] rounded-[3px] bg-bg-tag-orange text-[11px] font-semibold leading-[14px] text-white">
      {label}
    </span>
  )
}

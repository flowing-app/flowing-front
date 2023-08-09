import React from "react"

type SectionBadgeProps = {
  children: string
  /** @default false */
  active?: boolean
}

const SectionBadge = ({ active = false, children }: SectionBadgeProps) => {
  return (
    <span
      data-state={active ? "active" : "inactive"}
      className="text-xs font-bold px-1 py-0.5 rounded data-active:bg-sky-500 data-active:text-white bg-stone-600 text-white/50 mr-2"
    >
      {children}
    </span>
  )
}

export default SectionBadge

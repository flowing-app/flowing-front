import React from "react"
import { FiMinus, FiPlus } from "react-icons/fi"

import SectionBadge from "./SectionBadge"

import { useIsOpen } from "@/utils/useIsOpen"

export type SectionAccordionProps = {
  title: string
  badge: string
  children: React.ReactNode
  /** @default false */
  initOpen?: boolean
}

const SectionAccordion = ({ title, badge, children, initOpen = false }: SectionAccordionProps) => {
  const { isOpen, toggleIsOpen } = useIsOpen(initOpen)

  return (
    <div className="w-full">
      <button className="w-full text-start" onClick={toggleIsOpen}>
        <div className="px-3 flex items-center justify-between py-2 leading-none text-sm bg-stone-600">
          <h2 className="flex items-center text-stone-200">
            <SectionBadge active={isOpen}>{badge}</SectionBadge>
            {title}
          </h2>
          <div className="px-1 py-1">{isOpen ? <FiMinus /> : <FiPlus size={14} />}</div>
        </div>
      </button>
      {isOpen && <div className="w-full">{children}</div>}
    </div>
  )
}

export default SectionAccordion

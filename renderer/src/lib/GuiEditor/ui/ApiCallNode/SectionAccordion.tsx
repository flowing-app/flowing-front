import React from "react"
import { Drag } from "rete-react-plugin"
import { FiMinus, FiPlus } from "react-icons/fi"

import { useIsOpen } from "@/utils/useIsOpen"

import SectionBadge from "./SectionBadge"

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
      <Drag.NoDrag>
        <button className="w-full text-start" onClick={toggleIsOpen}>
          <div className="px-3 flex items-center justify-between py-2 leading-none text-sm bg-stone-600">
            <h2 className="flex items-center text-stone-200">
              <SectionBadge active={isOpen}>{badge}</SectionBadge>
              {title}
            </h2>
            <div className="px-1 py-1">{isOpen ? <FiMinus /> : <FiPlus size={14} />}</div>
          </div>
        </button>
      </Drag.NoDrag>
      {isOpen && <div className="w-full">{children}</div>}
    </div>
  )
}

export default SectionAccordion

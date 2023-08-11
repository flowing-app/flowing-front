import React, { useMemo } from "react"
import { FiCode } from "react-icons/fi"

import { useIsOpen } from "@/utils/useIsOpen"

type CollapsablePanelProps = {
  children: ({ onOpenChange }: { onOpenChange: (isOpen: boolean) => void }) => React.ReactNode
}

const CollapsablePanel = ({ children }: CollapsablePanelProps) => {
  const { isOpen, setIsOpen, toggleIsOpen } = useIsOpen(false)

  const component = useMemo(() => children({ onOpenChange: setIsOpen }), [children, setIsOpen])

  return (
    <div>
      <div className="absolute top-[52px] right-1" hidden={isOpen}>
        <button onClick={toggleIsOpen} className="p-4 text-stone-800 hover:text-stone-400">
          <FiCode size={20} />
        </button>
      </div>
      <div
        data-open={isOpen}
        className="absolute right-1 w-[50vw] max-w-[640px] top-[52px] bottom-1 rounded-xl overflow-y-scroll border-l-stone-700 border-l transition data-[open='false']:translate-x-[calc(100%+8px)]"
        style={{
          padding: "0 16px 16px 16px",
          background: "#1E1E1E",
          boxShadow: "-4px 0px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {component}
      </div>
    </div>
  )
}

export default CollapsablePanel

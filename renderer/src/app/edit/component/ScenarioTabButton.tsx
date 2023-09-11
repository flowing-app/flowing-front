import React, { useState } from "react"
import { FiEdit2, FiFile } from "react-icons/fi"

export type ScenarioTabButtonProps = {
  isSelected: boolean
  onSelect: () => void
  value: string | null
  onChange: (value: string) => void
  placeholder: string
}

const ScenarioTabButton = ({
  isSelected,
  onSelect,
  value,
  onChange,
  placeholder,
}: ScenarioTabButtonProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const handleClick = () => {
    if (isSelected) {
      setIsEditing(true)
    } else {
      onSelect()
    }
  }

  if (isEditing) {
    return (
      <div className="relative">
        <input
          autoFocus
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false)
            }
          }}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="absolute z-10 inset-0 placeholder:text-white/40 h-8 focus:outline-none font-bold text-xs py-2 px-4 transition bg-transparent leading-none text-white border rounded border-slate-200"
        />
        <div
          className="w-max font-bold text-xs py-2 px-4 leading-none h-8 border opacity-0 pointer-events-none min-w-[130px]"
          aria-hidden
        >
          {(value ?? "").length === 0 ? placeholder : value}
        </div>
      </div>
    )
  } else {
    return (
      <button
        data-state={isSelected ? "active" : undefined}
        onClick={handleClick}
        className="text-white/60 font-bold group text-xs py-2 h-8 bg-transparent px-4 leading-none data-active:text-white border rounded data-active:border-slate-200 border-white/40"
      >
        <FiEdit2
          className="mb-0.5 group-data-active:group-hover:inline hidden mr-2 shrink-0 text-white/80"
          size={12}
        />
        <FiFile
          className="mb-0.5 inline group-data-active:group-hover:!hidden mr-2 shrink-0 text-white/80"
          size={12}
        />
        {/* TODO: 編集可能にする */}
        {(value ?? "").length === 0 ? placeholder : value}
      </button>
    )
  }
}

export default ScenarioTabButton

import React from "react"
import { FiChevronDown, FiPlay } from "react-icons/fi"

import { useScenarios } from "../../logic/useScenarios"

import Dropdown from "@/components/Dropdown"

type ExecButtontsProps = {
  onExec: () => void
}

const ExecButtonts = ({ onExec }: ExecButtontsProps) => {
  const scenarios = useScenarios()

  return (
    <div className="flex gap-x-px bg-sky-300 rounded overflow-hidden">
      <button
        className="flex items-center gap-x-1 text-white py-2 px-2 hover:bg-sky-600 bg-sky-500"
        onClick={onExec}
      >
        <FiPlay size={14} />
        <div className="text-sm font-bold leading-none">実行する</div>
      </button>
      <Dropdown
        options={scenarios.map(({ id }) => ({
          id,
          label: id,
        }))}
      >
        <button className="bg-sky-500 px-2 text-white hover:bg-sky-600">
          <FiChevronDown />
        </button>
      </Dropdown>
    </div>
  )
}

export default ExecButtonts

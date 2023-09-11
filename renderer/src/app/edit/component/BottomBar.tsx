import React, { memo } from "react"
import { FiPlay } from "react-icons/fi"

type BottomBarProps = {
  onExec: () => void
}

const BottomBar = ({ onExec }: BottomBarProps) => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white border border-stone-200 overflow-hidden rounded-lg shadow-lg flex">
      <button
        onClick={onExec}
        className="flex items-center gap-x-2 px-4 py-2 text-stone-800 hover:bg-stone-50 active:translate-y-0.5 transition"
      >
        <FiPlay />
        <div>実行する</div>
      </button>
    </div>
  )
}

export default memo(BottomBar)

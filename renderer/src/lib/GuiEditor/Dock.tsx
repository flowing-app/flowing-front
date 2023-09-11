import React, { Fragment, useState } from "react"
import { MdOutlineDragIndicator } from "react-icons/md"
import { FiSearch } from "react-icons/fi"

import { useDropToAdd } from "./hook/useDropToAdd"

import { HTTP_METHODS_COLORS } from "@/utils/httpMethod"
import { useFuzzySearch } from "@/utils/useFuzzySearch"
import Switch from "@/components/Switch"
import { useStore } from "@/store"
import { convertOperationIdToReadableCase } from "@/utils/convertOperationIdCase"

const Dock = () => {
  const { onDragStart } = useDropToAdd()
  const { blocks } = useStore()
  const [value, setValue] = useState("")

  const [showOperationId, setShowOperationId] = useStore((store) => [
    store.showOperationId,
    store.setShowOperationId,
  ])

  const searchedBlocks = useFuzzySearch(
    blocks,
    (block) => `${block.method} ${block.path} ${block.operationId} ${block.summary}`,
    value,
  )

  return (
    <aside className="shrink-0 p-2 w-[250px] flex bg-white flex-col gap-y-2 border-r border-stone-200">
      <div className="relative bg-stone-100 rounded">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="focus:outline-none px-3 py-2 leading-none text-stone-600 pl-8 bg-transparent text-sm"
        />
        <FiSearch className="text-stone-400 absolute left-2 top-1/2 -translate-y-1/2" />
      </div>
      <div className="text-stone-600 text-xs flex items-center justify-end gap-x-2">
        <label htmlFor="show-operation-id-toggle" className="cursor-pointer">
          Show Operation ID
        </label>
        <Switch
          size="sm"
          id="show-operation-id-toggle"
          checked={showOperationId}
          onCheckedChange={setShowOperationId}
        />
      </div>
      <div className="overflow-y-scroll flex flex-col grow gap-y-2">
        {searchedBlocks.map((block) => (
          <div
            key={block.id}
            onDragStart={(e) => onDragStart(e, { type: "api-call", block })}
            draggable
            className="p-2 border hover:shadow text-stone-600 border-stone-200 rounded flex items-center gap-x-1 transition bg-white cursor-pointer hover:bg-white"
          >
            <div
              className="text-white text-xs font-bold px-1.5 py-1 leading-none rounded mr-2"
              style={{
                background: HTTP_METHODS_COLORS[block.method],
              }}
            >
              {block.method.toUpperCase().slice(0, 3)}
            </div>
            <div className="grow break-all text-sm font-bold">
              {showOperationId
                ? convertOperationIdToReadableCase(block.operationId)
                : block.path.split("/").map((fragment, i) => (
                    <Fragment key={i}>
                      {fragment}
                      {i !== block.path.split("/").length - 1 && "/"}
                    </Fragment>
                  ))}
            </div>
            <div className="text-stone-400 ml-auto shrink-0">
              <MdOutlineDragIndicator />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Dock

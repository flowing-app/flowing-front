import React from "react"
import { Handle, NodeProps, Position } from "reactflow"

import { BlockData } from "@/lib/GuiEditor/type"

const StartNode = ({ selected }: NodeProps<BlockData>) => {
  return (
    <div>
      <section
        style={{ height: "max-content", width: "200px" }}
        data-selected={selected}
        className="bg-[#333333] data-selected:ring ring-sky-500 text-white border-2 border-stone-600 rounded-lg overflow-hidden"
      >
        <h2 className="px-3 py-2 leading-none text bg-stone-600 flex items-center gap-2">START</h2>
        <div className="p-3 flex">
          <div className="w-full flex flex-col items-end gap-y-4 flex-1">
            <div className="flex items-center gap-x-2">
              <div className="text-sm">開始</div>
              <div className="absolute left-[calc(100%+6px)]">
                <Handle
                  className="!w-5 !h-5 rounded-full !border-[3px] !border-white !bg-[#333333] hover:!bg-stone-500 transition"
                  type="source"
                  id="success"
                  position={Position.Right}
                  isConnectable
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StartNode

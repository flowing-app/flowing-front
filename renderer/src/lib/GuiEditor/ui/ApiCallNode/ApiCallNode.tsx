import React from "react"
import { Handle, NodeProps, Position } from "reactflow"
import TextareaAutosize from "react-textarea-autosize"
import { FiEdit } from "react-icons/fi"

import { BlockData } from "@/lib/GuiEditor/type"
import { HTTP_METHODS_COLORS } from "@/utils/httpMethod"
import { useBodyEditState } from "@/store/bodyEdit"
import { useEditorStore } from "@/store"
import InlineEditor from "@/app/_component/InlineEditor"

import SectionAccordion from "./SectionAccordion"

const ApiCallNode = ({ id, selected, data }: NodeProps<BlockData>) => {
  const updateNodeData = useEditorStore((store) => store.updateNodeData)
  const { update } = useBodyEditState()

  return (
    <div className="relative">
      <section
        style={{ height: "max-content", width: "300px" }}
        data-selected={selected}
        className="bg-[#333333] data-selected:ring ring-sky-500 text-white border-2 border-stone-600 rounded-lg overflow-hidden"
      >
        <h2 className="px-3 py-2 leading-none text bg-stone-600 flex items-center gap-2">
          <span
            className="leading-none text-white text-sm font-bold px-1 py-1 rounded block"
            style={{
              background: HTTP_METHODS_COLORS[data.method],
            }}
          >
            {data.method.toUpperCase().slice(0, 3)}
          </span>
          <span className="font-normal block break-all">{data.path}</span>
        </h2>
        <div className="p-3 flex">
          <div className="w-full flex flex-col items-start gap-y-4 flex-1">
            <div className="flex items-center gap-x-2">
              <div className="absolute -translate-x-[calc(100%+20px)]">
                <Handle
                  className="!w-5 !h-5 rounded-full !border-[3px] grid place-items-center !border-white !bg-[#333333] hover:!bg-stone-600 transition"
                  type="target"
                  id="in"
                  position={Position.Left}
                  isConnectable
                />
              </div>
              <div className="text-sm ml-2">入力</div>
            </div>
          </div>
          <div className="w-full flex flex-col items-end gap-y-4 flex-1">
            <div className="flex items-center gap-x-2">
              <div className="text-sm mr-2">成功</div>
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
        <div className="p-2 px-3 text-stone-400">
          <TextareaAutosize
            className="bg-transparent focus:outline-none resize-none w-full"
            value={data.input.summary}
            onChange={(e) => {
              updateNodeData(id, {
                input: { ...data.input, summary: e.target.value },
              })
            }}
          />
        </div>
        <div className="m-4 mt-0">
          <button onClick={() => update(id)}>
            <div className="pl-1 pr-2 py-1 leading-none text-white/80 bg-stone-600 rounded flex items-center text-sm gap-x-2 hover:bg-stone-500 transition border border-stone-500">
              <FiEdit size={12} />
              <div>Body</div>
            </div>
          </button>
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <SectionAccordion title="テスト" badge="VALID" initOpen>
            <div className="p-2 bg-[#1E1E1E]">
              <InlineEditor
                value={data.input.test}
                onChange={(value) => {
                  updateNodeData(id, {
                    input: { ...data.input, test: value },
                  })
                }}
              />
            </div>
          </SectionAccordion>
          <SectionAccordion title="実行条件の指定" badge="SKIP">
            <div className="bg-[#333333]">
              <TextareaAutosize
                value={data.input.if}
                onChange={(e) => {
                  updateNodeData(id, {
                    input: { ...data.input, if: e.target.value },
                  })
                }}
                minRows={1}
                className="bg-opacity-0 w-full text-sm bg-[#333333] focus:outline-none p-2 font-mono resize-none"
              />
            </div>
          </SectionAccordion>
          <SectionAccordion title="繰り返し回数の指定" badge="LOOP">
            <div className="bg-[#333333]">
              <input
                type="number"
                value={data.input.loop.count}
                onChange={(e) => {
                  const count = parseInt(e.target.value, 10)
                  if (isNaN(count)) {
                    return
                  }
                  updateNodeData(id, {
                    input: { ...data.input, loop: { count } },
                  })
                }}
                className="bg-opacity-0 w-full text-sm bg-[#333333] focus:outline-none p-2 font-mono resize-none"
              />
            </div>
          </SectionAccordion>
        </div>
      </section>
    </div>
  )
}

export default ApiCallNode

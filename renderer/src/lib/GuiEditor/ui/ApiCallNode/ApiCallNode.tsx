import React, { useState } from "react"
import { Handle, NodeProps, Position } from "reactflow"
import { FiCheck, FiChevronDown, FiEdit2, FiMinus, FiPlus, FiX } from "react-icons/fi"
import TextareaAutosize from "react-textarea-autosize"

import ChipButton from "./ChipButton"

import { BlockData } from "@/lib/GuiEditor/type"
import { useBodyEditState } from "@/store/bodyEdit"
import { useStore } from "@/store"
import InlineEditor from "@/app/edit/_component/InlineEditor"
import { convertOperationIdToReadableCase } from "@/utils/convertOperationIdCase"
import MethodChip from "@/components/MethodChip"
import Card from "@/components/Card"

const ApiCallNode = ({ id, selected, data }: NodeProps<BlockData>) => {
  const updateNodeData = useStore((store) => store.updateNodeData)
  const { update } = useBodyEditState()

  const [addSkip, setAddSkip] = useState(false)
  const [addRepeat, setAddRepeat] = useState(false)

  const [showTest, setShowTest] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)

  const showOperationId = useStore((store) => store.showOperationId)

  return (
    <div className="relative">
      <div className="absolute bottom-full mb-2">
        {data.result === "failure" ? (
          <div className="py-2 px-3 flex items-center bg-red-500 text-white rounded">
            <FiX size={24} />
            失敗
          </div>
        ) : data.result === "skipped" ? (
          <div className="py-2 px-3 flex items-center bg-slate-400 text-white rounded">
            <FiMinus size={24} />
            未実行
          </div>
        ) : data.result === "success" ? (
          <div className="py-2 px-3 flex items-center bg-green-600 text-white rounded">
            <FiCheck size={24} />
            成功
          </div>
        ) : null}
      </div>

      <div className="flex items-center flex-col gap-y-2">
        <Card selected={selected} className="w-[400px]">
          <div className="flex items-center">
            <MethodChip className="mr-4">{data.method}</MethodChip>
            <span className="text-xl block break-all font-bold">
              {showOperationId ? convertOperationIdToReadableCase(data.operationId) : data.path}
            </span>
          </div>
          <div className="px-3 flex h-1">
            <div className="w-full flex flex-col items-start gap-y-4 flex-1">
              <div className="flex items-center gap-x-2">
                <div className="absolute -translate-x-[calc(100%+34px)]">
                  <Handle
                    className="!w-5 !h-5 rounded-full !border-[3px] grid place-items-center !border-white !bg-[#333333] hover:!bg-stone-600 transition"
                    type="target"
                    id="in"
                    position={Position.Left}
                    isConnectable
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-end gap-y-4 flex-1">
              <div className="flex items-center gap-x-2">
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
          <div>
            <TextareaAutosize
              className="bg-transparent focus:outline-none py-2 resize-none w-full text-slate-500"
              placeholder="IDを入力"
              value={data.input.summary}
              maxRows={1}
              onChange={(e) => {
                updateNodeData(id, {
                  input: { ...data.input, summary: e.target.value },
                })
              }}
            />
          </div>
          <div className="flex w-full flex-wrap gap-2">
            <ChipButton color="gray" icon={FiEdit2} onClick={() => update(id)}>
              Edit
            </ChipButton>
            {(!addSkip || !addRepeat) && <div className="w-[2px] h-[32px] bg-slate-200" />}
            {!addSkip && (
              <ChipButton color="blue" icon={FiPlus} onClick={() => setAddSkip(true)}>
                実行条件
              </ChipButton>
            )}
            {!addRepeat && (
              <ChipButton color="blue" icon={FiPlus} onClick={() => setAddRepeat(true)}>
                繰り返し回数
              </ChipButton>
            )}
          </div>
        </Card>
        <Card className="w-[360px] ml-[40px]" compact>
          <button
            onClick={() => setShowTest((prev) => !prev)}
            className="flex w-full items-center justify-between"
          >
            <div className="bg-slate-200 text-sm w-max font-bold px-2 rounded py-1.5 leading-none text-slate-600">
              テスト
            </div>
            <div>
              <FiChevronDown />
            </div>
          </button>
          {showTest && (
            <div className="rounded overflow-hidden">
              <InlineEditor
                value={data.input.test}
                onChange={(value) => {
                  updateNodeData(id, {
                    input: { ...data.input, test: value },
                  })
                }}
              />
            </div>
          )}
        </Card>
        {addSkip && (
          <Card className="w-[360px] ml-[40px]" compact>
            <button
              onClick={() => setShowSkip((prev) => !prev)}
              className="flex w-full items-center justify-between"
            >
              <div className="bg-slate-200 text-sm w-max font-bold px-2 rounded py-1.5 leading-none text-slate-600">
                実行条件
              </div>
              <div>
                <FiChevronDown />
              </div>
            </button>
            {showSkip && (
              <div className="rounded overflow-hidden">
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
            )}
          </Card>
        )}
        {addRepeat && (
          <Card className="w-[360px] ml-[40px]" compact>
            <button
              onClick={() => setShowRepeat((prev) => !prev)}
              className="flex w-full items-center justify-between"
            >
              <div className="bg-slate-200 text-sm w-max font-bold px-2 rounded py-1.5 leading-none text-slate-600">
                繰り返し
              </div>
              <div>
                <FiChevronDown />
              </div>
            </button>
            {showRepeat && (
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
            )}
          </Card>
        )}
      </div>
    </div>
  )
}

export default ApiCallNode

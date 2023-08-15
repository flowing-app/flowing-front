import React, { useState } from "react"
import { Handle, NodeProps, Position } from "reactflow"
import { FiCheck, FiChevronDown, FiEdit2, FiMinus, FiPlus, FiX } from "react-icons/fi"
import TextareaAutosize from "react-textarea-autosize"
import clsx from "clsx"

import { BlockData } from "@/lib/GuiEditor/type"
import { useBodyEditState } from "@/store/bodyEdit"
import { useStore } from "@/store"
import { HTTP_METHODS_COLORS } from "@/utils/httpMethod"
import InlineEditor from "@/app/edit/_component/InlineEditor"

const Card = ({
  children,
  selected,
  compact,
  className,
}: {
  children: React.ReactNode
  selected?: boolean
  compact?: boolean
  className?: string
}) => (
  <div
    data-selected={selected}
    className={clsx(
      "bg-white data-[selected='true']:ring h-max ring-sky-300 shadow-lg text-slate-600 rounded-lg overflow-hidden border border-slate-300 flex flex-col gap-y-2",
      compact ? "px-4 py-2 border-slate-200/80" : "p-4 border-slate-300",
      className,
    )}
  >
    {children}
  </div>
)

const Chip = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center bg-white text-sky-600/80 border cursor-pointer border-sky-600/20 hover:bg-sky-50 rounded-full pl-3 pr-4 py-1 leading-none"
  >
    <FiPlus />
    <div className="text-sm">{children}</div>
  </button>
)

const ApiCallNode = ({ id, selected, data }: NodeProps<BlockData>) => {
  const updateNodeData = useStore((store) => store.updateNodeData)
  const { update } = useBodyEditState()

  const [addSkip, setAddSkip] = useState(false)
  const [addRepeat, setAddRepeat] = useState(false)

  const [showTest, setShowTest] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)

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
            <span
              className="leading-none text-white font-bold px-2 py-1 rounded block mr-4"
              style={{
                background: HTTP_METHODS_COLORS[data.method],
              }}
            >
              {data.method.toUpperCase().slice(0, 3)}
            </span>
            <span className="text-xl block break-all font-bold">{data.path}</span>
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
              className="bg-transparent focus:outline-none py-2 resize-none w-full text-slate-500 text-sm"
              placeholder="説明を入力"
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
            <button onClick={() => update(id)}>
              <div className="flex items-center gap-x-1 bg-white text-slate-600/80 border cursor-pointer border-slate-600/20 hover:bg-slate-50 rounded-full pl-3 pr-4 py-2 leading-none">
                <FiEdit2 size={12} />
                <div>Body</div>
              </div>
            </button>
            <div className="w-[2px] h-[32px] bg-slate-200" />
            {!addSkip && <Chip onClick={() => setAddSkip(true)}>実行条件</Chip>}
            {!addRepeat && <Chip onClick={() => setAddRepeat(true)}>繰り返し回数</Chip>}
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
                繰り返し回数
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

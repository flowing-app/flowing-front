import React from "react"
import { Node } from "reactflow"
import TextareaAutosize from "react-textarea-autosize"
import { FiPlus } from "react-icons/fi"

import FreeEditor from "./FreeEditor"

import { BlockData } from "@/lib/GuiEditor/type"
import { useStore } from "@/store"
import { convertOperationIdToReadableCase } from "@/utils/convertOperationIdCase"
import MethodChip from "@/components/MethodChip"
import { genId } from "@/utils/genId"
import Section from "@/components/Section"
import KVInput from "@/components/KVInput"

type NodeConfigPanel = {
  node: Node<BlockData>
}

const NodeConfigPanel = ({ node }: NodeConfigPanel) => {
  const showOperationId = useStore((store) => store.showOperationId)
  const updateNodeData = useStore((store) => store.updateNodeData)

  const parameters = node.data.input.parameters

  // @ts-expect-error
  const hasBody: boolean = node.data.requestBody?.["content"]?.["application/json"] != null

  const addParameter = (_in: "header" | "path" | "query" | "cookie") => {
    updateNodeData(node.id, {
      input: {
        ...node.data.input,
        parameters: {
          ...node.data.input.parameters,
          [_in]: [...node.data.input.parameters[_in], [genId(), "", "", true]],
        },
      },
    })
  }

  const updateParameter = (
    value: string,
    pos: "key" | "value",
    _in: "header" | "path" | "query" | "cookie",
    i: number,
  ) => {
    updateNodeData(node.id, {
      input: {
        ...node.data.input,
        parameters: {
          ...node.data.input.parameters,
          [_in]: node.data.input.parameters[_in].map((p, j) => {
            if (j !== i) return p
            if (pos === "key") return [p[0], value, p[2], p[3]]
            return [p[0], p[1], value, p[2]]
          }),
        },
      },
    })
  }

  const deleteParameter = (_in: "header" | "path" | "query" | "cookie", i: number) => {
    updateNodeData(node.id, {
      input: {
        ...node.data.input,
        parameters: {
          ...node.data.input.parameters,
          [_in]: node.data.input.parameters[_in].filter((_, j) => j !== i),
        },
      },
    })
  }

  return (
    <div className="bg-slate-50 rounded-lg p-4 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h3 className="font-bold text-xl text-slate-600 flex items-center gap-x-4">
          <MethodChip>{node.data.method}</MethodChip>
          <div>
            {showOperationId
              ? convertOperationIdToReadableCase(node.data.operationId)
              : node.data.path}
          </div>
        </h3>
        <div>
          <TextareaAutosize
            className="bg-transparent focus:outline-none py-2 resize-none w-full text-slate-500 text-sm"
            placeholder="説明を入力"
            value={node.data.input.summary}
            maxRows={1}
            onChange={(e) => {
              updateNodeData(node.id, {
                input: { ...node.data.input, summary: e.target.value },
              })
            }}
          />
        </div>
      </div>
      {0 < parameters.path.length && (
        <Section title="Path Parameter">
          <div className="overflow-hidden mt-1 text-sm max-h-[280px] text-slate-600">
            {parameters.path.map((param, i) => {
              return (
                <KVInput
                  key={param[0]}
                  valueK={param[1]}
                  valueV={param[2]}
                  onChangeK={(value) => updateParameter(value, "key", "path", i)}
                  onChangeV={(value) => updateParameter(value, "value", "path", i)}
                  onClickDelete={() => deleteParameter("path", i)}
                  lockedKey={!param[3]}
                />
              )
            })}
          </div>
        </Section>
      )}
      {0 < parameters.query.length && (
        <Section title="Query Parameter">
          <div className="overflow-hidden mt-1 text-sm max-h-[280px] text-slate-600">
            {parameters.query.map((param, i) => {
              return (
                <KVInput
                  key={param[0]}
                  valueK={param[1]}
                  valueV={param[2]}
                  onChangeK={(value) => updateParameter(value, "key", "query", i)}
                  onChangeV={(value) => updateParameter(value, "value", "query", i)}
                  onClickDelete={() => deleteParameter("query", i)}
                  lockedKey={!param[3]}
                />
              )
            })}
            <button
              onClick={() => addParameter("query")}
              className="flex items-center gap-x-1 text-xs px-2 py-1 text-slate-400 hover:text-slate-600 mt-1"
            >
              <FiPlus />
              <div>追加する</div>
            </button>
          </div>
        </Section>
      )}

      <Section title="Header">
        <div className="overflow-hidden mt-1 text-sm max-h-[280px] text-slate-600">
          {parameters.header.map((param, i) => {
            return (
              <KVInput
                key={param[0]}
                valueK={param[1]}
                valueV={param[2]}
                onChangeK={(value) => updateParameter(value, "key", "header", i)}
                onChangeV={(value) => updateParameter(value, "value", "header", i)}
                onClickDelete={() => deleteParameter("header", i)}
                lockedKey={!param[3]}
              />
            )
          })}
          <button
            onClick={() => addParameter("header")}
            className="flex items-center gap-x-1 text-xs px-2 py-1 text-slate-400 hover:text-slate-600 mt-1"
          >
            <FiPlus />
            <div>追加する</div>
          </button>
        </div>
      </Section>

      <Section title="Cookie">
        <div className="overflow-hidden mt-1 text-sm max-h-[280px] text-slate-600">
          {parameters.cookie.map((param, i) => {
            return (
              <KVInput
                key={param[0]}
                valueK={param[1]}
                valueV={param[2]}
                onChangeK={(value) => updateParameter(value, "key", "cookie", i)}
                onChangeV={(value) => updateParameter(value, "value", "cookie", i)}
                onClickDelete={() => deleteParameter("cookie", i)}
                lockedKey={!param[3]}
              />
            )
          })}
          <button
            onClick={() => addParameter("cookie")}
            className="flex items-center gap-x-1 text-xs px-2 py-1 text-slate-400 hover:text-slate-600 mt-1"
          >
            <FiPlus />
            <div>追加する</div>
          </button>
        </div>
      </Section>

      {hasBody && (
        <Section title="Body">
          <div className="rounded-lg overflow-hidden mt-1 max-h-[280px]">
            <FreeEditor node={node} />
          </div>
        </Section>
      )}
    </div>
  )
}

export default NodeConfigPanel

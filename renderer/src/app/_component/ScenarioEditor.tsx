import React, { memo, useMemo } from "react"
import { dump } from "js-yaml"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import { useFlattenNodes } from "@/store"
import { BlockData } from "@/lib/GuiEditor/type"

const ScenarioEditor = () => {
  const nodes = useFlattenNodes()

  const yaml = useMemo(() => {
    const flowObj = nodes
      .map((node) => {
        if (node.type !== "api-call") return []
        const data: BlockData = node.data
        return {
          [data.input.summary !== "" ? data.input.summary : data.operationId!]: {
            if: data.input.if === "true" ? undefined : data.input.if,
            loop:
              data.input.loop.count === 1
                ? undefined
                : {
                    count: data.input.loop.count,
                  },
            req: {
              [data.path]: {
                [data.method]: {
                  body: {
                    "application/json": data.input.body,
                  },
                },
              },
            },
            test: data.input.test,
          },
        }
      })
      .flat()
    return dump(flowObj)
  }, [nodes])

  return <CodeEditor value={yaml} onChange={() => {}} language="yaml" onMount={(_, monaco) => {}} />
}

export default memo(ScenarioEditor)

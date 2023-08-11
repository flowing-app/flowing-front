import { Node } from "reactflow"
import { dump } from "js-yaml"

import { BlockData } from "@/lib/GuiEditor/type"
import { ipc } from "@/utils/rpc"

export type ExecTestResult = {
  total: number
  success: number
  failure: number
  skipped: number
  results: [
    {
      id: string
      path: string
      result: "success" | "failure"
      steps: {
        key: string
        result: "success" | "failure" | "skipped"
      }[]
    },
  ]
}

export const execTest = async (nodes: Node<BlockData>[]): Promise<ExecTestResult> => {
  // 各ステップ情報を runn 形式に変換する
  const steps = nodes.reduce((steps, node) => {
    if (node.type !== "api-call") return steps
    const data = node.data
    return {
      ...steps,
      [data.input.summary ?? data.operationId!]: {
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
  }, {})

  const dumped = dump({
    desc: "Test Scenario",
    runners: {
      // TODO: 現在はモック
      req: "http://127.0.0.1:8084",
    },
    debug: true,
    steps,
  })

  const res: ExecTestResult = await ipc.execScenario(dumped)
  return res
}

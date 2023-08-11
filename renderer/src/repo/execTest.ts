import { Node } from "reactflow"
import { dump } from "js-yaml"

import { BlockData } from "@/lib/GuiEditor/type"
import { ipc } from "@/utils/ipc"
import { convertNodesToSteps } from "@/logic/convertNodeToSteps"

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
  const scenario = convertNodesToSteps({
    nodes,
    title: "API Test",
    reqUrl: "http://127.0.0.1:8084",
  })

  const dumped = dump(scenario)

  const res: ExecTestResult = await ipc.execScenario(dumped)
  return res
}

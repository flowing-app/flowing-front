import { Node } from "reactflow"
import { dump } from "js-yaml"

import { BlockData, Meta, Variable } from "@/lib/GuiEditor/type"
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

export const execTest = async (
  nodes: Node<BlockData>[],
  variables: Variable[],
  meta: Meta,
): Promise<ExecTestResult> => {
  // 各ステップ情報を runn 形式に変換する
  const scenario = convertNodesToSteps({
    nodePath: nodes,
    title: meta.title,
    reqUrl: meta.reqUrl,
    variables,
  })

  const dumped = dump(scenario)
  const res: ExecTestResult = await ipc.execScenario(dumped)
  return res
}

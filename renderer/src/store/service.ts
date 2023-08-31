import { StateCreator } from "zustand"
import { Edge, Node } from "reactflow"

import { MetaSlice } from "./meta"

import { ExecTestResult, execTest } from "@/repo/execTest"
import { resolveNodes } from "@/logic/resolveNodes"
import { BlockData, Meta, Variable } from "@/lib/GuiEditor/type"

export type InputSlice = {
  nodes: Node[]
  edges: Edge[]
  variables: Variable[]
  meta: Meta
}

export type ServiceSlice = {
  execTest: () => Promise<void>
  saveScenarioFile: () => Promise<void>
  result: ExecTestResult | null
}

export const createServiceSlice: StateCreator<
  ServiceSlice & InputSlice & MetaSlice,
  [],
  [],
  ServiceSlice
> = (set, get) => ({
  result: null,
  execTest: async () => {
    const { nodes, edges, variables, meta } = get()
    const resolvedNodes = resolveNodes(nodes, edges)
    const result = await execTest(resolvedNodes, variables, meta)
    set({ result })

    // データをノードに格納する
    set((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.type !== "api-call") {
          return node
        }
        const res = result.results[0].steps.find(
          (r) => r.key === (node.data as BlockData).input.summary,
        )?.result
        return { ...node, data: { ...node.data, result: res } }
      }),
    }))
  },
  saveScenarioFile: async () => {
    const { nodes, edges, variables, meta, fileMeta } = get()
    const resolvedNodes = resolveNodes(nodes, edges)
    console.log(resolvedNodes)
    // const scenario = convertNodesToSteps({
    //   nodes: resolvedNodes,
    //   title: meta.title,
    //   reqUrl: meta.reqUrl,
    //   variables,
    // })

    // const yaml = dump(scenario)

    // const path = await ipc.saveScenarioFile({
    //   title: fileMeta.title ?? meta.title,
    //   openApiPath: fileMeta.openApi ?? undefined,
    //   path: fileMeta.path ?? undefined,
    //   yaml,
    // })

    // if (path != null) {
    //   set((prev) => ({ ...prev, fileMeta: { ...prev.fileMeta, path } }))
    // }
  },
})

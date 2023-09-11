import { StateCreator } from "zustand"
import { Edge, Node } from "reactflow"
import { dump } from "js-yaml"

import { MetaSlice } from "./meta"

import { ExecTestResult, execTest } from "@/repo/execTest"
import { resolveNodes } from "@/logic/resolveNodes"
import { BlockData, Meta, Variable } from "@/lib/GuiEditor/type"
import { convertNodesToSteps } from "@/logic/convertNodeToSteps"
import { ipc } from "@/utils/ipc"

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
    const { nodePath: resolvedNodes } = resolveNodes(nodes, edges)
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
    const { nodePath: resolvedNodes, scenarioMap } = resolveNodes(nodes, edges)
    const files = resolvedNodes
      .map(({ nodePath }) => ({
        title: meta.title,
        body: convertNodesToSteps({
          nodePath,
          title: meta.title,
          reqUrl: meta.reqUrl,
          variables,
        }),
      }))
      .map(({ title, body }) => ({ title, body: dump(body) }))

    const path = await ipc.saveScenarioFile({
      title: fileMeta.title ?? meta.title,
      openApiPath: fileMeta.openApi ?? undefined,
      path: fileMeta.path ?? undefined,
      files,
    })

    if (path != null) {
      set((prev) => ({ ...prev, fileMeta: { ...prev.fileMeta, path } }))
    }
  },
})

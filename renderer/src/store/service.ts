import { StateCreator } from "zustand"
import { Edge, Node } from "reactflow"

import { ExecTestResult, execTest } from "@/repo/execTest"
import { resolveNodes } from "@/logic/resolveNodes"
import { BlockData } from "@/lib/GuiEditor/type"

export type InputSlice = {
  nodes: Node[]
  edges: Edge[]
}

export type ServiceSlice = {
  execTest: () => Promise<void>
  result: ExecTestResult | null
}

export const createServiceSlice: StateCreator<ServiceSlice & InputSlice, [], [], ServiceSlice> = (
  set,
  get,
) => ({
  result: null,
  execTest: async () => {
    const { nodes, edges } = get()
    const resolvedNodes = resolveNodes(nodes, edges)
    const result = await execTest(resolvedNodes)
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
})

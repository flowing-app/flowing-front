import { StateCreator } from "zustand"
import { Edge, Node } from "reactflow"

import { ExecTestResult, execTest } from "@/repo/execTest"
import { resolveNodes } from "@/logic/resolveNodes"

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
  },
})

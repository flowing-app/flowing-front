import { StateCreator } from "zustand"
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowInstance,
} from "reactflow"

import { BlockData, Meta, Variable } from "@/lib/GuiEditor/type"
import { resolveNodes } from "@/logic/resolveNodes"

const initialNodes = [{ id: "start", type: "start", data: {}, position: { x: 100, y: 100 } }]

type Scenario = {
  id: string
  scenario: {
    id: string
    nodePaths: Node[]
  }[]
}

export type RFSlice = {
  nodes: Node[]
  edges: Edge[]
  variables: Variable[]
  scenarios: Scenario[]
  meta: Meta
  blocks: BlockData[]
  reactFlowInstance: ReactFlowInstance | null
  addNode: (node: Node) => void
  onNodesChange: OnNodesChange
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  updateNodeData: (
    id: string,
    data: Partial<Omit<BlockData, "input"> & { input?: Partial<BlockData["input"]> }>,
  ) => void
  setVariables: (variables: Variable[]) => void
  setMeta: (meta: Partial<Meta>) => void
  getFlow: () => { nodes: Node[]; edges: Edge[] }
  registerBlocks: (blocks: BlockData[]) => void
  setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void
  // getResolvedNodes: () => Node[][]
}

export const createRfSlice: StateCreator<RFSlice, [], [], RFSlice> = (set, get) => ({
  nodes: initialNodes,
  edges: [],
  variables: [],
  scenarios: [],
  blocks: [],
  meta: {
    title: "API Test",
    reqUrl: "http://127.0.0.1:8084",
  },
  reactFlowInstance: null,
  addNode: (node) => {
    set(({ nodes }) => ({ nodes: [...nodes, node] }))
  },
  onNodesChange: (changes: NodeChange[]) => {
    console.log("CHANGE", changes)
    const newNodes = applyNodeChanges(changes, get().nodes)
    set({
      nodes: newNodes,
    })
  },
  setEdges: (update) => {
    if (typeof update === "function") {
      set(({ edges }) => ({ edges: update(edges) }))
    } else {
      set({ edges: update })
    }
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    console.log("EDGE", changes)
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection: Connection) => {
    console.log("connection", connection)
    const edges = addEdge(connection, get().edges)

    // NOTE: 分岐
    const { branchIds } = resolveNodes(get().nodes, edges)
    const nodes = get().nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        branch: branchIds.includes(node.id),
      },
    }))

    set({ edges, nodes })
  },
  updateNodeData: (id, data) => {
    set(({ nodes }) => {
      return {
        nodes: nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: { ...node.data, ...data, input: { ...node.data.input, ...data.input } },
              }
            : node,
        ),
      }
    })
  },
  setVariables: (variables) => {
    set({ variables })
  },
  setMeta: (meta) => {
    set({ meta: { ...get().meta, ...meta } })
  },
  getFlow: () => {
    const { nodes, edges } = get()
    return { nodes, edges }
  },
  getResolvedNodes: () => {
    const { nodes, edges } = get()
    return resolveNodes(nodes, edges)
  },
  registerBlocks: (blocks) => {
    set({ blocks })
  },
  setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => {
    set({ reactFlowInstance })
  },
})

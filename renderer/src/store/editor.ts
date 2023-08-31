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
} from "reactflow"

import { BlockData, Meta, Variable } from "@/lib/GuiEditor/type"
import { resolveNodes } from "@/logic/resolveNodes"

const initialNodes = [{ id: "start", type: "start", data: {}, position: { x: 100, y: 100 } }]

export type RFSlice = {
  nodes: Node[]
  edges: Edge[]
  variables: Variable[]
  meta: Meta
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>
  onNodesChange: OnNodesChange
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  updateNodeData: (id: string, data: Partial<BlockData>) => void
  setVariables: (variables: Variable[]) => void
  setMeta: (meta: Partial<Meta>) => void
  getFlow: () => { nodes: Node[]; edges: Edge[] }
  // getResolvedNodes: () => Node[][]
}

export const createRfSlice: StateCreator<RFSlice, [], [], RFSlice> = (set, get) => ({
  nodes: initialNodes,
  edges: [],
  variables: [],
  meta: {
    title: "API Test",
    reqUrl: "http://127.0.0.1:8084",
  },
  setNodes: (update) => {
    if (typeof update === "function") {
      set(({ nodes }) => ({ nodes: update(nodes) }))
    } else {
      set({ nodes: update })
    }
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
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
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  updateNodeData: (id: string, data: Partial<BlockData>) => {
    set(({ nodes }) => {
      return {
        nodes: nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
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
  // getVariables: () => {
  //   const { variables } = get()
  //   return variables
  // },
})

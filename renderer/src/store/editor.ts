import { create } from "zustand"
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
import { useMemo } from "react"

import { BlockData } from "@/lib/GuiEditor/type"

const initialNodes = [{ id: "start", type: "start", data: {}, position: { x: 100, y: 100 } }]

type RFState = {
  nodes: Node[]
  edges: Edge[]
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>
  onNodesChange: OnNodesChange
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  getFlow: () => Node[]
  updateNodeData: (id: string, data: Partial<BlockData>) => void
}

export const useEditorStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: [],
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
  getFlow: () => {
    const { nodes, edges } = get()
    const startNode = nodes.find((node) => node.type === "start")
    const res: Node[] = []
    let next = startNode
    while (next != null) {
      const edge = edges.find((edge) => edge.source === next?.id)
      next = nodes.find((node) => node.id === edge?.target)
      if (next != null) {
        res.push(next)
      } else {
        next = undefined
      }
    }
    return res
  },
}))

export const useFlattenNodes = () => {
  const { nodes, edges } = useEditorStore()
  return useMemo(() => {
    const startNode = nodes.find((node) => node.type === "start")
    const res: Node[] = []
    let next = startNode
    while (next != null) {
      const edge = edges.find((edge) => edge.source === next?.id)
      next = nodes.find((node) => node.id === edge?.target)
      if (next != null) {
        res.push(next)
      } else {
        next = undefined
      }
    }
    return res
  }, [edges, nodes])
}

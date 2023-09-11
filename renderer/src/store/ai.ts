import { StateCreator } from "zustand"
import { Node } from "reactflow"

import { RFSlice } from "@/store/editor"
import { genId } from "@/utils/genId"
import { waitFor } from "@/utils/waitFor"

type Properties = {
  title: string
  openApi: string | null
  path: string | null
}

export type AiSlice = {
  addAiSuggestedBlocks: (prompt: string) => Promise<void>
  acceptAiSuggestions: () => void
  denyAiSuggestions: () => void
}

export const createAiSlice: StateCreator<AiSlice & RFSlice, [], [], AiSlice> = (set, get) => ({
  addAiSuggestedBlocks: async (prompt) => {
    await waitFor(5000)

    const [title, ...path] = [
      "ペット削除の確認",
      "loginUser",
      "addPet",
      "getPetById",
      "deletePet",
      "getPetById",
    ]
    // TODO: タイトルの追加
    const { addNode, blocks, onConnect, reactFlowInstance } = get()

    const start = get().nodes.find((node) => node.type === "start")

    let position = {
      x: (start?.position.x ?? 0) + 300,
      y: start?.position.y ?? 0,
    }
    let prevNode = start

    for (const operationId of path) {
      const blockData = blocks.find((block) => block.operationId === operationId)
      const id = genId()
      const newNode: Node = {
        id,
        type: "api-call",
        position,
        data: { ...blockData, isAiSuggest: true },
      }
      addNode(newNode)
      reactFlowInstance?.fitBounds(
        {
          x: position.x - 400,
          y: position.y - 200,
          width: 1600,
          height: 1600,
        },
        {
          duration: 500,
        },
      )
      if (prevNode != null) {
        onConnect({
          source: prevNode.id,
          target: newNode.id,
          sourceHandle: "success",
          targetHandle: "in",
        })
      }
      position = {
        x: position.x + 500,
        y: position.y,
      }
      prevNode = newNode
      await waitFor(500)
    }
    // TODO: 結果判断ノード
  },
  acceptAiSuggestions: () => {
    const { nodes } = get()
    set({
      nodes: nodes.map((node) => {
        if (node.data?.isAiSuggest) {
          return {
            ...node,
            type: "api-call",
            data: {
              ...node.data,
              isAiSuggest: false,
            },
          }
        }
        return node
      }),
    })
  },
  denyAiSuggestions: () => {
    const { reactFlowInstance, nodes, edges, onNodesChange, onEdgesChange } = get()
    const removedNodes = nodes.filter((node) => node.data?.isAiSuggest === true)
    const removedEdges = edges.filter((edge) => {
      return removedNodes.some((node) => node.id === edge.source || node.id === edge.target)
    })
    onEdgesChange(
      removedEdges.map(({ id }) => ({
        type: "remove",
        id,
      })),
    )
    onNodesChange(
      removedNodes.map(({ id }) => ({
        type: "remove",
        id,
      })),
    )
    const startNode = nodes.find((node) => node.type === "start")
    if (startNode == null) {
      return
    }

    reactFlowInstance?.fitBounds(
      {
        x: startNode.position.x - 400,
        y: startNode.position.y - 200,
        width: 1600,
        height: 1600,
      },
      {
        duration: 500,
      },
    )
  },
})

import { Edge, Node } from "reactflow"

import { BlockData } from "@/lib/GuiEditor/type"

/**
 * ノードとエッジの情報から、ノードのリストを返す
 */
export const resolveNodes = (nodes: Node<BlockData>[], edges: Edge[]) => {
  const startNode = nodes.find((node) => node.type === "start")
  const resolvedNodeList: Node[] = []
  let next = startNode
  while (next != null) {
    const edge = edges.find((edge) => edge.source === next?.id)
    next = nodes.find((node) => node.id === edge?.target)
    if (next != null) {
      resolvedNodeList.push(next)
    } else {
      next = undefined
    }
  }

  return resolvedNodeList
}

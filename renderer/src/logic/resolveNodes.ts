import { Edge, Node } from "reactflow"

import { BlockData } from "@/lib/GuiEditor/type"
import { calcTreePaths } from "@/lib/calcTreePaths"

/**
 * ノードとエッジの情報から、ノードのリストを返す
 */
export const resolveNodes = (nodes: Node<BlockData>[], edges: Edge[]) => {
  const startNode = nodes.find((node) => node.type === "start")

  if (startNode == null) {
    throw new Error("開始ノードが見つかりません")
  }

  // NodeId -> Node のマップを作成
  const nodeMap = nodes.reduce<Record<string, Node>>((acc, node) => {
    acc[node.id] = node
    return acc
  }, {})

  // 木構造から、ノード ID のパスを計算
  const idPathList = calcTreePaths(
    edges.map((edge) => [edge.source, edge.target]),
    startNode.id,
  )

  // ノード ID のパスを、ノードのパスに変換
  return idPathList.map((idPath) => {
    const lastNodeId = idPath[idPath.length - 1]!
    const nodePath = idPath.map((id) => nodeMap[id]!)
    return {
      id: lastNodeId,
      nodePath,
    }
  })
}

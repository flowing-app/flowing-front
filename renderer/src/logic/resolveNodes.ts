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
  const {
    paths: idPathList,
    branchIds,
    scenarioMap,
  } = calcTreePaths(
    edges.map((edge) => [edge.source, edge.target]),
    startNode.id,
  )

  // ノード ID のパスを、ノードのパスに変換
  return {
    nodePath: idPathList.map(({ path, id }) => {
      const nodePath = path.map((id) => nodeMap[id]!)
      return {
        id,
        nodePath,
      }
    }),
    branchIds,
    scenarioMap,
  }
}

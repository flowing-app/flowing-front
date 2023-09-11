export const calcTreePaths = (edges: [string, string][], start: string) => {
  const graph: Record<string, string[]> = {} // グラフの隣接リスト表現
  for (const [from, to] of edges) {
    if (!graph[from]) {
      graph[from] = []
    }
    graph[from]!.push(to)
  }

  const paths: { path: string[]; id: string }[] = [] // 最終的な経路のリストのリスト
  const currentPath = [start] // 現在の経路

  const branchIds: string[] = [] // 分岐ノードのIDのリスト
  const scenarioMap: Record<string, string[]> = {} // シナリオノードのIDのリスト

  const dfs = (node: string, ancestorBranchId: string): string[] => {
    if (scenarioMap[node] == null) {
      scenarioMap[node] = []
    }

    if (!graph[node]) {
      paths.push({ id: ancestorBranchId, path: [...currentPath] }) // 葉ノードに達したら経路を追加
      scenarioMap[node]!.push(ancestorBranchId)
      branchIds.push(ancestorBranchId)
      return [ancestorBranchId]
    }

    const isMultiChildNode = graph[node]!.length > 1
    const scenarioBaseIds: string[] = []

    for (const neighbor of graph[node]!) {
      currentPath.push(neighbor) // 隣接ノードを経路に追加
      const _scenarioBaseIds = dfs(neighbor, isMultiChildNode ? neighbor : ancestorBranchId) // 再帰的に探索
      scenarioBaseIds.push(..._scenarioBaseIds)
      currentPath.pop() // 戻ってきたら経路から削除
    }

    scenarioMap[node]!.push(...scenarioBaseIds)
    return scenarioBaseIds
  }

  dfs(start, start) // DFS開始

  return { paths, branchIds, scenarioMap }
}

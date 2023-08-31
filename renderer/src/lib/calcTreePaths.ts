export const calcTreePaths = (edges: [string, string][], start: string) => {
  const graph: Record<string, string[]> = {} // グラフの隣接リスト表現
  for (const [from, to] of edges) {
    if (!graph[from]) {
      graph[from] = []
    }
    graph[from]!.push(to)
  }

  const paths: string[][] = [] // 最終的な経路のリストのリスト
  const currentPath = [start] // 現在の経路

  const dfs = (node: string) => {
    if (!graph[node]) {
      paths.push([...currentPath]) // 経路が見つかったらリストに追加
      return
    }

    for (const neighbor of graph[node]!) {
      currentPath.push(neighbor) // 隣接ノードを経路に追加
      dfs(neighbor) // 再帰的に探索
      currentPath.pop() // 戻ってきたら経路から削除
    }
  }

  dfs(start) // DFS開始

  return paths
}

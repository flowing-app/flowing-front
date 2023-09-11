import { useMemo } from "react"

import { convertNodesToSteps } from "@/logic/convertNodeToSteps"
import { resolveNodes } from "@/logic/resolveNodes"
import { useStore } from "@/store"

export const useScenarios = () => {
  const [nodes, edges] = useStore((store) => [store.nodes, store.edges])
  const variables = useStore((store) => store.variables)
  const meta = useStore((store) => store.meta)

  const scenarios = useMemo(() => {
    const { nodePath: resolvedNodes } = resolveNodes(nodes, edges)
    const isSingleScenario = resolvedNodes.length === 1
    return resolvedNodes.map(({ id, nodePath }) => {
      const steps = convertNodesToSteps({
        nodePath,
        title: meta.title,
        reqUrl: meta.reqUrl,
        variables,
      })
      const title = nodes.find((node) => node.id === id)?.data?.input?.scenarioTitle as
        | string
        | null

      return {
        id,
        title: isSingleScenario ? "シナリオ" : title,
        steps,
      }
    })
  }, [edges, meta.reqUrl, meta.title, nodes, variables])

  return scenarios
}

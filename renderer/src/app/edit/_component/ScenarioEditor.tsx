import React, { memo, useMemo } from "react"
import { dump } from "js-yaml"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import { useStore } from "@/store"
import { convertNodesToSteps } from "@/logic/convertNodeToSteps"
import { resolveNodes } from "@/logic/resolveNodes"

const ScenarioEditor = () => {
  const resolvedNodes = useStore((store) => resolveNodes(store.nodes, store.edges))

  const yaml = useMemo(() => {
    const steps = convertNodesToSteps({
      nodes: resolvedNodes,
      title: "Test Scenario",
      reqUrl: "http://127.0.0.1:8084",
    })
    return dump(steps)
  }, [resolvedNodes])

  return <CodeEditor value={yaml} onChange={() => {}} language="yaml" />
}

export default memo(ScenarioEditor)

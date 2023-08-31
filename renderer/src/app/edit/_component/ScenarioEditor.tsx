import React, { memo, useEffect, useMemo, useState } from "react"
import { dump } from "js-yaml"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import { useStore } from "@/store"
import { convertNodesToSteps } from "@/logic/convertNodeToSteps"
import { resolveNodes } from "@/logic/resolveNodes"

const ScenarioEditor = () => {
  const [nodes, edges] = useStore((store) => [store.nodes, store.edges])
  const variables = useStore((store) => store.variables)
  const meta = useStore((store) => store.meta)

  const scenarios = useMemo(() => {
    const resolvedNodes = resolveNodes(nodes, edges)
    const scenarios = resolvedNodes.map(({ id, nodePath }) => {
      const steps = convertNodesToSteps({
        nodePath: nodePath,
        title: meta.title,
        reqUrl: meta.reqUrl,
        variables,
      })
      return {
        id,
        yaml: dump(steps),
      }
    })
    return scenarios
  }, [edges, meta.reqUrl, meta.title, nodes, variables])

  const [selectedTab, setSelectedTab] = useState(scenarios[0]?.id)

  const selectedYaml = scenarios.find((s) => s.id === selectedTab)?.yaml

  useEffect(() => {
    if (1 <= scenarios.length && scenarios.find((s) => s.id === selectedTab) == null) {
      setSelectedTab(scenarios[0]?.id)
    }
  }, [scenarios, selectedTab])

  return (
    <div>
      <div className="flex items-center gap-x-1">
        {scenarios.map(({ id }, i) => (
          <button
            key={id}
            data-state={selectedTab === id ? "active" : undefined}
            onClick={() => setSelectedTab(id)}
            className="text-white/60 font-bold text-sm py-2 px-4 leading-none data-active:text-white"
          >
            scenario{i + 1}
          </button>
        ))}
      </div>
      {selectedYaml != null && (
        <CodeEditor key={selectedTab} value={selectedYaml} onChange={() => {}} language="yaml" />
      )}
    </div>
  )
}

export default memo(ScenarioEditor)

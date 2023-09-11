import React, { memo, useEffect, useMemo, useState } from "react"
import { dump } from "js-yaml"

import { useScenarios } from "../logic/useScenarios"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import ScenarioTabButton from "@/app/edit/component/ScenarioTabButton"
import { useStore } from "@/store"

const ScenarioEditor = () => {
  const updateNodeData = useStore((store) => store.updateNodeData)

  const scenarios = useScenarios()
  const dumpedScenarios = useMemo(
    () =>
      scenarios.map((scenario) => ({
        ...scenario,
        yaml: dump(scenario),
      })),
    [scenarios],
  )

  const [selectedTab, setSelectedTab] = useState(scenarios[0]?.id)

  const selectedYaml = dumpedScenarios.find((s) => s.id === selectedTab)?.yaml

  useEffect(() => {
    if (1 <= scenarios.length && scenarios.find((s) => s.id === selectedTab) == null) {
      setSelectedTab(scenarios[0]?.id)
    }
  }, [scenarios, selectedTab])

  return (
    <div>
      {1 < scenarios.length && (
        <div className="flex items-center gap-x-1 overflow-x-scroll py-4">
          {scenarios.map(({ id, title }, i) => (
            <div key={id} className="shrink-0">
              <ScenarioTabButton
                key={id}
                isSelected={selectedTab === id}
                onSelect={() => setSelectedTab(id)}
                placeholder="シナリオ名を入力"
                value={title}
                onChange={(value) =>
                  updateNodeData(id, {
                    input: { scenarioTitle: value },
                  })
                }
              />
            </div>
            // <button
            //   key={id}
            //   data-state={selectedTab === id ? "active" : undefined}
            //   onClick={() => setSelectedTab(id)}
            //   className="text-white/60 shrink-0 font-bold text-xs py-2 px-4 leading-none data-active:text-white border rounded data-active:border-slate-200 border-white/40"
            // >
            //   {/* TODO: 編集可能にする */}
            //   {title ?? "シナリオ名未入力"}
            // </button>
          ))}
        </div>
      )}
      {selectedYaml != null && (
        <CodeEditor key={selectedTab} value={selectedYaml} onChange={() => {}} language="yaml" />
      )}
    </div>
  )
}

export default memo(ScenarioEditor)

import React, { memo, useMemo } from "react"
import { dump } from "js-yaml"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import { useStore } from "@/store"

const ScenarioEditor = () => {
  const getResolvedNodes = useStore((store) => store.getResolvedNodes)

  const yaml = useMemo(() => {
    const resolvedNodes = getResolvedNodes()
    return dump(resolvedNodes)
  }, [getResolvedNodes])

  return <CodeEditor value={yaml} onChange={() => {}} language="yaml" />
}

export default memo(ScenarioEditor)

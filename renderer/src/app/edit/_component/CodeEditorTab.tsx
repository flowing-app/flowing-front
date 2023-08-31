import React, { memo, useState } from "react"
import * as Tabs from "@radix-ui/react-tabs"
import { FiX } from "react-icons/fi"

import ScenarioEditor from "./ScenarioEditor"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"

type CodeEditorTabProps = {
  onOpenChange: (isOpen: boolean) => void
}

const CodeEditorTab = ({ onOpenChange }: CodeEditorTabProps) => {
  const [tab, setTab] = useState("scenario")
  // const { nodeId, update } = useBodyEditState()
  // const node = useStore((store) => store.nodes.find((node) => node.id === nodeId) ?? null) as
  //   | Node<BlockData>
  //   | undefined

  const handleClose = () => {
    // update(null)
    onOpenChange(false)
  }

  // useEffect(() => {
  //   if (nodeId != null) {
  //     setTab("free")
  //     onOpenChange(true)
  //   }
  // }, [nodeId, onOpenChange])

  return (
    <Tabs.Root value={tab} onValueChange={setTab}>
      <Tabs.List className="flex items-center gap-8">
        <Tabs.Trigger
          value="scenario"
          className="text-white/60 font-bold text-sm py-2 data-active:text-white/90 transition data-active:text-white"
        >
          Test Scenario
        </Tabs.Trigger>
        <Tabs.Trigger
          value="openapi"
          className="text-white/60 font-bold text-sm py-2 data-active:text-white/90 transition data-active:text-white"
        >
          Open API
        </Tabs.Trigger>
        <button onClick={handleClose} className="ml-auto">
          <FiX className="text-white" />
        </button>
      </Tabs.List>
      <Tabs.Content value="scenario">
        <ScenarioEditor />
      </Tabs.Content>
      <Tabs.Content value="openapi">
        <CodeEditor onChange={() => {}} language="yaml" />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default memo(CodeEditorTab)

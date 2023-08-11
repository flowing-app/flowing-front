import React, { memo, useEffect, useState } from "react"
import * as Tabs from "@radix-ui/react-tabs"
import { FiX } from "react-icons/fi"
import { Node } from "reactflow"

import FreeEditor from "./FreeEditor"

import { useBodyEditState } from "@/store/bodyEdit"
import { useEditorStore } from "@/store"
import { BlockData } from "@/lib/GuiEditor/type"

type CodeEditorTabProps = {
  onOpenChange: (isOpen: boolean) => void
  openApi: React.ReactElement
  scenario: React.ReactElement
}

const CodeEditorTab = ({ onOpenChange, openApi, scenario }: CodeEditorTabProps) => {
  const [tab, setTab] = useState("scenario")
  const { nodeId, update } = useBodyEditState()
  const node = useEditorStore((store) => store.nodes.find((node) => node.id === nodeId) ?? null) as
    | Node<BlockData>
    | undefined

  const handleClose = () => {
    update(null)
    onOpenChange(false)
  }

  useEffect(() => {
    if (nodeId != null) {
      setTab("free")
      onOpenChange(true)
    }
  }, [nodeId, onOpenChange])

  return (
    <Tabs.Root value={tab} onValueChange={setTab}>
      <Tabs.List className="flex items-center gap-8">
        {node != null && (
          <Tabs.Trigger
            value="free"
            className="text-white/60 font-bold text-sm py-2 data-active:text-white/90 transition data-active:text-white"
          >
            {node.data.operationId}
          </Tabs.Trigger>
        )}
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
      {node != null && (
        <Tabs.Content value="free">
          <FreeEditor node={node} />
        </Tabs.Content>
      )}
      <Tabs.Content value="scenario">{scenario}</Tabs.Content>
      <Tabs.Content value="openapi">{openApi}</Tabs.Content>
    </Tabs.Root>
  )
}

export default memo(CodeEditorTab)

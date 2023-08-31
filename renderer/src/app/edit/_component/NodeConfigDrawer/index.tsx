import React from "react"
import { Node } from "reactflow"

import NodeConfigDrawerContent from "./NodeConfigDrawerContent"

import { BlockData } from "@/lib/GuiEditor/type"
import { useStore } from "@/store"
import { useBodyEditState } from "@/store/bodyEdit"
import Drawer from "@/components/Drawer"

const NodeConfigDrawer = () => {
  const { nodeId } = useBodyEditState()
  const node = useStore((store) => store.nodes.find((node) => node.id === nodeId) ?? null) as
    | Node<BlockData>
    | undefined

  return (
    <Drawer isOpen={node != null}>{node != null && <NodeConfigDrawerContent node={node} />}</Drawer>
  )
}

export default NodeConfigDrawer

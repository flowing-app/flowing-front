import React, { useState } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  ReactFlowInstance,
} from "reactflow"

import ApiCallNode from "./ui/ApiCallNode/ApiCallNode"
import { BlockData } from "./type"
import Dock from "./Dock"
import { useDropToAddEditor } from "./hook/useDropToAdd"
import StartNode from "./ui/StartNode/StartNode"
import { useDeletableEdge } from "./hook/useDeletableEdge"

import { useStore } from "@/store"

import "reactflow/dist/style.css"
import "./style.css"

const defaultViewport = { x: 0, y: 0, zoom: 1 }
const nodeTypes = { "api-call": ApiCallNode, start: StartNode }

type EditorProps = {
  blocks: BlockData[]
}

export const Editor = ({ blocks }: EditorProps) => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect } = useStore()

  const deletableEdgeProps = useDeletableEdge(setEdges)
  const { reactFlowWrapper, dragProps } = useDropToAddEditor(reactFlowInstance, setNodes)

  return (
    <ReactFlowProvider>
      <div className="w-full h-full flex">
        <Dock blocks={blocks} />
        <div className="grow" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onInit={setReactFlowInstance}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultViewport={defaultViewport}
            minZoom={0.2}
            maxZoom={4}
            attributionPosition="bottom-left"
            nodeTypes={nodeTypes}
            className="relative"
            snapToGrid
            {...deletableEdgeProps}
            {...dragProps}
          >
            <Background color="#F2F5FA" variant={BackgroundVariant.Lines} />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

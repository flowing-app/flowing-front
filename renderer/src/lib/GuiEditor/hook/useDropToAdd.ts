import { useCallback, useMemo, useRef } from "react"
import { ReactFlowInstance, Node } from "reactflow"

import { genId } from "@/utils/genId"

import { BlockData } from "../type"

export type TransferObject = {
  type: string
  block: BlockData
}

type SetNodeFunc = React.Dispatch<React.SetStateAction<Node<{}, string | undefined>[]>>

const getExampleJson = (block: BlockData | undefined) => {
  const requestBody = block?.requestBody
  if (requestBody == null) {
    return {}
  }
  if ("$ref" in requestBody) {
    // TODO: 対応する
    return {}
  }
  const mediaType = requestBody.content["application/json"]
  if (mediaType == null) {
    return {}
  }
}

export const useDropToAdd = () => {
  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLElement>, transferObject: TransferObject) => {
      const example = getExampleJson(transferObject.block)
      event.dataTransfer.setData("application/flowing", JSON.stringify(transferObject))
      event.dataTransfer.effectAllowed = "move"
    },
    [],
  )
  return useMemo(() => ({ onDragStart }), [onDragStart])
}

export const useDropToAddEditor = <Elm extends HTMLElement = HTMLDivElement>(
  reactFlowInstance: ReactFlowInstance | null,
  setNodes: SetNodeFunc,
) => {
  const reactFlowWrapper = useRef<Elm>(null)

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (reactFlowInstance == null) {
        return
      }
      const reactFlowWrapperElm = reactFlowWrapper.current
      if (reactFlowWrapperElm == null) {
        return
      }
      const reactFlowBounds = reactFlowWrapperElm.getBoundingClientRect()
      const obj = event.dataTransfer.getData("application/flowing")
      const transferObject = JSON.parse(obj) as TransferObject

      if (transferObject.type !== "api-call") {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      const newNode = {
        id: genId(),
        type: transferObject.type,
        position,
        data: transferObject.block,
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes],
  )

  return useMemo(
    () => ({ reactFlowWrapper, dragProps: { onDragOver, onDrop } }),
    [reactFlowWrapper, onDragOver, onDrop],
  )
}

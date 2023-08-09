import { useCallback, useMemo, useRef } from "react"
import { Edge, OnEdgeUpdateFunc, updateEdge } from "reactflow"

export const useDeletableEdge = (setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) => {
  const edgeUpdateSuccessful = useRef(true)

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false
  }, [])

  const onEdgeUpdate = useCallback<OnEdgeUpdateFunc>(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true
      setEdges((els) => updateEdge(oldEdge, newConnection, els))
    },
    [setEdges],
  )

  const onEdgeUpdateEnd = useCallback(
    (_: unknown, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id))
      }

      edgeUpdateSuccessful.current = true
    },
    [setEdges],
  )

  return useMemo(
    () => ({
      onEdgeUpdateStart,
      onEdgeUpdate,
      onEdgeUpdateEnd,
    }),
    [onEdgeUpdate, onEdgeUpdateEnd, onEdgeUpdateStart],
  )
}

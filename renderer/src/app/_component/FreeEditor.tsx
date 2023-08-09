import React, { useEffect, useRef, useState } from "react"
import { Node } from "reactflow"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import { BlockData } from "@/lib/GuiEditor/type"
import { useEditorStore } from "@/store"

import type { editor } from "monaco-editor/esm/vs/editor/editor.api"

type FreeEditorProps = {
  node: Node<BlockData> | null
}

const FreeEditor = ({ node }: FreeEditorProps) => {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>()
  const updateNodeData = useEditorStore((store) => store.updateNodeData)
  const prevDecorations = useRef<string[]>([])

  useEffect(() => {
    if (editor == null) {
      return
    }

    const dispose = editor.onDidChangeModelContent(() => {
      console.log("CHANGE")
      const editorModel = editor.getModel()
      if (editorModel == null) {
        return
      }

      const matches = editorModel.findMatches(
        "steps?\\[\\d+\\]|step|steps",
        false,
        true,
        false,
        null,
        false,
      )
      if (matches == null) {
        return
      }

      editorModel.deltaDecorations(prevDecorations.current, [])

      prevDecorations.current = []
      matches.forEach((match) => {
        const decorations = [
          {
            range: match.range,
            options: {
              isWholeLine: false,
              inlineClassName: "step-highlight",
              stickiness: 1,
            },
          },
        ]
        const ids = editorModel.deltaDecorations([], decorations)
        prevDecorations.current.push(...ids)
      })
    })
    return () => dispose.dispose()
  }, [editor, node?.data.input.body])

  const data = node?.data
  if (data == null) {
    return null
  }

  const value = JSON.stringify(data.input.body, null, 2)

  return (
    <CodeEditor
      value={value}
      onChange={(value) => {
        try {
          const parsedInput = JSON.parse(value ?? "")
          updateNodeData(node!.id, { input: { ...data.input, body: parsedInput } })
        } catch {}
      }}
      language="json"
      theme="flowing-json"
      onMount={(editor) => {
        setEditor(editor)
      }}
    />
  )
}

export default FreeEditor

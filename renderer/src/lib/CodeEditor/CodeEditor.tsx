import React, { memo } from "react"
import MonacoEditor from "@monaco-editor/react"

import { useStore } from "@/store"

type CodeEditorProps = { language: string }

const CodeEditor = ({
  language,
  options,
  ...props
}: CodeEditorProps & React.ComponentPropsWithoutRef<typeof MonacoEditor>) => {
  const { openApi, setOpenApi } = useStore((store) => ({
    openApi: store.openApi,
    setOpenApi: store.setOpenApi,
  }))

  return (
    <MonacoEditor
      height="calc(100vh - 32px)"
      value={openApi ?? ""}
      onChange={(value) => setOpenApi(value ?? "")}
      defaultLanguage={language}
      theme="vs-dark"
      language={language}
      options={{
        formatOnType: true,
        formatOnPaste: true,
        ...options,
      }}
      {...props}
    />
  )
}

export default memo(CodeEditor)

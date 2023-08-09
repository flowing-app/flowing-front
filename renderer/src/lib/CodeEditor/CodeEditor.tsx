import React, { memo } from "react"
import MonacoEditor from "@monaco-editor/react"

type CodeEditorProps = { value: string; onChange: (value: string) => void; language: string }

const CodeEditor = ({
  value,
  onChange,
  language,
  options,
  ...props
}: CodeEditorProps & React.ComponentPropsWithoutRef<typeof MonacoEditor>) => {
  return (
    <MonacoEditor
      height="calc(100vh - 32px)"
      value={value}
      onChange={(value) => onChange(value ?? "")}
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

import { useMonaco } from "@monaco-editor/react"
import { useEffect } from "react"

export const useFlowingJsonExtension = () => {
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco == null) {
      return
    }

    // Syntax Highlight
    monaco.languages.setMonarchTokensProvider("json", {
      tokenizer: {
        root: [[/\{\{(.+)\}\}/, "custom-exp"]],
      },
    })

    monaco.editor.defineTheme("flowing-json", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "custom-exp", foreground: "#FF0000" }],
      colors: {},
    })

    // Comletion Provider
    monaco.languages.registerCompletionItemProvider("json", {
      triggerCharacters: ["{"],
      provideCompletionItems: (model, position) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        })

        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        }

        if (textUntilPosition.endsWith("{{")) {
          return {
            suggestions: [
              {
                label: "{{ expression }}",
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "式を挿入する",
                insertText: "{{ ${1:expression} }}".slice(2),
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
              },
            ],
          }
        }
      },
    })
  }, [monaco])
}

import { useMonaco } from "@monaco-editor/react"
import { languages } from "monaco-editor"
import { useEffect } from "react"

export const useFlowingLang = () => {
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco == null) {
      return
    }
    monaco.languages.register({ id: "flowingLang" })

    // Syntax Highlight
    monaco.languages.setMonarchTokensProvider("flowingLang", {
      tokenizer: {
        root: [
          [/\{\{|\}\}/, "custom-exp"],
          [/steps(\[\d+\]|\.\w+)/, "custom-step"],
          [/current/, "custom-step"],
          [/previous/, "custom-step"],
          [/res/, "custom-accessor"],
          [/body/, "custom-accessor"],
          [/status/, "custom-accessor"],
          [/==|>|<|<=|>=/, "custom-operand"],
          [/\d+/, "custom-integer"],
        ],
      },
    })

    monaco.editor.defineTheme("my-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "custom-exp", foreground: "#659F58" },
        { token: "custom-step", foreground: "#ff6e5a" },
        { token: "custom-accessor", foreground: "#FFA500" },
        { token: "custom-operand", foreground: "#7a9bf8" },
        { token: "custom-integer", foreground: "#edb753" },
      ],
      colors: {},
    })

    // Completion Provider
    monaco.languages.registerCompletionItemProvider("flowingLang", {
      triggerCharacters: ["{", "."],
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

        const suggestions: languages.CompletionItem[] = []
        let isSelectSubItem = false

        if (/(s)$/.test(textUntilPosition)) {
          suggestions.push({
            label: "steps",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "steps",
            range: range,
          })
        }
        if (/c$/.test(textUntilPosition)) {
          suggestions.push({
            label: "current",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "current",
            range: range,
          })
        }
        if (/p$/.test(textUntilPosition)) {
          suggestions.push({
            label: "previous",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "previous",
            range: range,
          })
        }
        if (/(steps(\[\d+\]|\.\w+)|current|previous)\.$/.test(textUntilPosition)) {
          isSelectSubItem = true
          suggestions.push({
            label: "res",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "res",
            range: range,
          })
        }
        if (/(steps(\[\d+\]|\.\w+)|current|previous)\.res.$/.test(textUntilPosition)) {
          isSelectSubItem = true
          suggestions.push({
            label: "body",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "body",
            range: range,
          })
        }
        if (!isSelectSubItem) {
          suggestions.push({
            label: "current.res.body",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "current.res.body",
            range: range,
          })
          suggestions.push({
            label: "current.res.status",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "current.res.status",
            range: range,
            detail: "現在のステップの本文",
            documentation: "現在のステップの本文",
          })
        }

        return { suggestions }
      },
    })
  }, [monaco])
}

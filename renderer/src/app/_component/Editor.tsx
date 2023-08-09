import React, { useCallback } from "react"
import { load as loadYaml } from "js-yaml"
import { OpenAPIV3_1 } from "openapi-types"
import useSWR from "swr"

import { Editor } from "@/lib/GuiEditor"
import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import CollapsablePanel from "@/lib/CollapsablePanel/CollapsablePanel"
import { SAMPLE_YAML } from "@/utils/sampleYaml"
import { retrieveBlockFromOpenApiSpec } from "@/utils/retrieveBlockFromOpenApiSpec"
import { Initializer } from "@/lib/CodeEditor"
import { API_BASE_URL } from "@/consntants"
import { useFlattenNodes } from "@/store"
import { BlockData } from "@/lib/GuiEditor/type"

import CodeEditorTab from "./CodeEditorTab"
import ScenarioEditor from "./ScenarioEditor"
import BottomBar from "./BottomBar"

const openApiSpec = loadYaml(SAMPLE_YAML) as OpenAPIV3_1.Document

const EditorPage = () => {
  const { data: blocks } = useSWR("parse-blocks", () => retrieveBlockFromOpenApiSpec(openApiSpec))

  const nodes = useFlattenNodes()

  const handleExec = useCallback(async () => {
    const bookObj = nodes
      .map((node) => {
        if (node.type !== "api-call") return []
        const data: BlockData = node.data
        return {
          [data.operationId!]: {
            if: data.input.if === "true" ? undefined : data.input.if,
            loop:
              data.input.loop.count === 1
                ? undefined
                : {
                    count: data.input.loop.count,
                  },
            req: {
              [data.path]: {
                [data.method]: {
                  body: {
                    "application/json": data.input.body,
                  },
                },
              },
            },
            test: data.input.test,
          },
        }
      })
      .flat()
    await fetch(`${API_BASE_URL}/exec`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book: bookObj,
      }),
    })
  }, [nodes])

  return (
    <>
      <Initializer />
      <div className="w-screen h-screen">
        {blocks != null && <Editor blocks={blocks} />}
        <CollapsablePanel>
          {({ onOpenChange }) => (
            <CodeEditorTab
              onOpenChange={onOpenChange}
              scenario={<ScenarioEditor />}
              openApi={<CodeEditor value={SAMPLE_YAML} onChange={() => {}} language="yaml" />}
            />
          )}
        </CollapsablePanel>
      </div>
      <BottomBar onExec={handleExec} />
    </>
  )
}

export default EditorPage

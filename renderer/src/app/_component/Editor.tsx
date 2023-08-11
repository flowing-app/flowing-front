import React, { useCallback } from "react"
import { dump, load as loadYaml } from "js-yaml"
import useSWR from "swr"

import CodeEditorTab from "./CodeEditorTab"
import ScenarioEditor from "./ScenarioEditor"
import BottomBar from "./BottomBar"

import type { OpenAPIV3_1 } from "openapi-types"

import { Editor } from "@/lib/GuiEditor"
import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import CollapsablePanel from "@/lib/CollapsablePanel/CollapsablePanel"
import { SAMPLE_YAML } from "@/utils/sampleYaml"
import { retrieveBlockFromOpenApiSpec } from "@/utils/retrieveBlockFromOpenApiSpec"
import { Initializer } from "@/lib/CodeEditor"
import { useFlattenNodes } from "@/store"
import { BlockData } from "@/lib/GuiEditor/type"
import { ipc } from "@/utils/rpc"

const openApiSpec = loadYaml(SAMPLE_YAML) as OpenAPIV3_1.Document

const EditorPage = () => {
  const { data: blocks } = useSWR("parse-blocks", () => retrieveBlockFromOpenApiSpec(openApiSpec))

  const nodes = useFlattenNodes()

  const handleExec = useCallback(async () => {
    const steps = nodes.reduce((steps, node) => {
      if (node.type !== "api-call") return steps
      const data: BlockData = node.data
      return {
        ...steps,
        [data.input.summary ?? data.operationId!]: {
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
    }, {})

    const dumped = dump({
      desc: "Test Scenario",
      runners: {
        req: "http://127.0.0.1:8084",
      },
      debug: true,
      steps,
    })
    const res = await ipc.execScenario(dumped)
    window.alert(JSON.stringify(res))
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

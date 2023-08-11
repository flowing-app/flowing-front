import React from "react"
import { load as loadYaml } from "js-yaml"
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
import { useStore } from "@/store"

const openApiSpec = loadYaml(SAMPLE_YAML) as OpenAPIV3_1.Document

const EditorPage = () => {
  const execTest = useStore((store) => store.execTest)
  const { data: blocks } = useSWR("parse-blocks", () => retrieveBlockFromOpenApiSpec(openApiSpec))

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
      <BottomBar onExec={execTest} />
    </>
  )
}

export default EditorPage

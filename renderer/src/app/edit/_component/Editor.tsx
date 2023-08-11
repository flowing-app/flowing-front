import React from "react"
import useSWR from "swr"
import { load } from "js-yaml"
import { OpenAPIV3_1 } from "openapi-types"

import CodeEditorTab from "./CodeEditorTab"
import ScenarioEditor from "./ScenarioEditor"
import BottomBar from "./BottomBar"

import { Editor } from "@/lib/GuiEditor"
import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import CollapsablePanel from "@/lib/CollapsablePanel/CollapsablePanel"
import { retrieveBlockFromOpenApiSpec } from "@/utils/retrieveBlockFromOpenApiSpec"
import { Initializer } from "@/lib/CodeEditor"
import { useStore } from "@/store"

const EditorPage = () => {
  const execTest = useStore((store) => store.execTest)

  const { data: blocks } = useSWR("parse-blocks", () =>
    retrieveBlockFromOpenApiSpec(
      load(useStore.getState().openApi ?? "") as OpenAPIV3_1.Document<{}>,
    ),
  )

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
              openApi={<CodeEditor onChange={() => {}} language="yaml" />}
            />
          )}
        </CollapsablePanel>
      </div>
      <BottomBar onExec={execTest} />
    </>
  )
}

export default EditorPage

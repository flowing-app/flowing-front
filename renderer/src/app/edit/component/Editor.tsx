import React from "react"
import useSWR from "swr"
import { load } from "js-yaml"
import { OpenAPIV3_1 } from "openapi-types"

import CodeEditorTab from "./CodeEditorTab"
import NodeConfigDrawer from "./NodeConfigDrawer"
import GlobalConfigDrawer from "./GlobalConfigDrawer"
import EditorHeader from "./EditorHeader/EditorHeader"

import { Editor } from "@/lib/GuiEditor"
import CollapsablePanel from "@/lib/CollapsablePanel/CollapsablePanel"
import { retrieveBlockFromOpenApiSpec } from "@/utils/retrieveBlockFromOpenApiSpec"
import { Initializer } from "@/lib/CodeEditor"
import { useStore } from "@/store"
import AiInput from "@/app/edit/component/AiInput/AiInput"

const EditorPage = () => {
  const { data: blocks } = useSWR("parse-blocks", () =>
    retrieveBlockFromOpenApiSpec(
      load(useStore.getState().openApi ?? "") as OpenAPIV3_1.Document<{}>,
    ),
  )

  return (
    <>
      <Initializer />
      <div className="w-screen h-[calc(100vh-48px)]">
        <EditorHeader />
        <div className="relative h-[calc(100vh-48px-40px)] overflow-hidden">
          {blocks != null && <Editor blocks={blocks} />}
          <CollapsablePanel>
            {({ onOpenChange }) => <CodeEditorTab onOpenChange={onOpenChange} />}
          </CollapsablePanel>
          <GlobalConfigDrawer />
          <NodeConfigDrawer />
        </div>
        <AiInput />
      </div>
    </>
  )
}

export default EditorPage

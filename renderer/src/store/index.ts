import { create } from "zustand"

import { RFSlice, createRfSlice } from "./editor"
import { ServiceSlice, createServiceSlice } from "./service"
import { OpenApiSlice, createOpenApiSlice } from "./openApi"
import { EditorConfigSlice, createEditorConfigSlice } from "./editorConfig"
import { MetaSlice, createMetaSlice } from "./meta"
import { createAiSlice, AiSlice } from "./ai"

export const useStore = create<
  RFSlice & ServiceSlice & OpenApiSlice & EditorConfigSlice & MetaSlice & AiSlice
>((...args) => ({
  ...createRfSlice(...args),
  ...createServiceSlice(...args),
  ...createOpenApiSlice(...args),
  ...createEditorConfigSlice(...args),
  ...createMetaSlice(...args),
  ...createAiSlice(...args),
}))

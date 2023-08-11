import { create } from "zustand"

import { RFSlice, createRfSlice } from "./editor"
import { ServiceSlice, createServiceSlice } from "./service"
import { OpenApiSlice, createOpenApiSlice } from "./openApi"

export const useStore = create<RFSlice & ServiceSlice & OpenApiSlice>((...args) => ({
  ...createRfSlice(...args),
  ...createServiceSlice(...args),
  ...createOpenApiSlice(...args),
}))

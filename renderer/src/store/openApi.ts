import { StateCreator } from "zustand"
import { load } from "js-yaml"

export type OpenApiSlice = {
  openApi: string | null
  format: "yaml" | "json"
  setOpenApi: (openApi: string, format?: "json" | "yaml") => void
  getAsJson: () => string | null
}

export const createOpenApiSlice: StateCreator<OpenApiSlice, [], [], OpenApiSlice> = (set, get) => ({
  openApi: null,
  format: "yaml",
  updateValue: (openApi: string) => set({ openApi }),
  setOpenApi: (openApi, format) => (format == null ? set({ openApi }) : set({ openApi, format })),
  getAsJson: () => {
    const { openApi, format } = get()
    if (openApi == null) {
      return null
    }

    if (format === "json") {
      return openApi
    }

    return JSON.stringify(load(openApi))
  },
})

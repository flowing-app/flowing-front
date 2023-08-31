import { StateCreator } from "zustand"

type Properties = {
  title: string
  openApi: string | null
  path: string | null
}

export type MetaSlice = {
  fileMeta: Properties
  updateFileMeta: (meta: Partial<Properties>) => void
}

export const createMetaSlice: StateCreator<MetaSlice, [], [], MetaSlice> = (set, get) => ({
  fileMeta: {
    title: "",
    openApi: null,
    path: null,
  },
  updateFileMeta: (args) => {
    set((prev) => ({ ...prev, fileMeta: { ...prev.fileMeta, ...args } }))
  },
})

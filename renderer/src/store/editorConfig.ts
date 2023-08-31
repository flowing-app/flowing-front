import { StateCreator } from "zustand"

export type EditorConfigSlice = {
  // Operation ID
  showOperationId: boolean
  setShowOperationId: (showOperationId: boolean) => void
  toggleShowOperationId: () => void

  // Global Panel
  showGlobalPanel: boolean
  setShowGlobalPanel: (showGlobalPanel: boolean) => void
  toggleShowGlobalPanel: () => void
}

export const createEditorConfigSlice: StateCreator<EditorConfigSlice, [], [], EditorConfigSlice> = (
  set,
  get,
) => ({
  showOperationId: false,
  setShowOperationId: (showOperationId: boolean) => set({ showOperationId }),
  toggleShowOperationId: () => set({ showOperationId: !get().showOperationId }),

  showGlobalPanel: false,
  setShowGlobalPanel: (showGlobalPanel: boolean) => set({ showGlobalPanel }),
  toggleShowGlobalPanel: () => set({ showGlobalPanel: !get().showGlobalPanel }),
})

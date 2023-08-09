import { create } from "zustand"

export type BodyEditState = {
  nodeId: string | null
  update: (nodeId: string | null) => void
}

export const useBodyEditState = create<BodyEditState>((set, get) => ({
  nodeId: null,
  update: (nodeId) => set({ nodeId }),
}))

import { create } from "zustand"

import { RFSlice, createRfSlice } from "./editor"
import { ServiceSlice, createServiceSlice } from "./service"

export const useStore = create<RFSlice & ServiceSlice>((...args) => ({
  ...createRfSlice(...args),
  ...createServiceSlice(...args),
}))

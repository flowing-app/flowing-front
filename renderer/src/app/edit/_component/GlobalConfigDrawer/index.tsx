import React from "react"

import GlobalConfigDrawerContent from "./GlobalConfigDrawerContent"

import { useStore } from "@/store"
import Drawer from "@/components/Drawer"

const GlobalConfigDrawer = () => {
  const showGlobalPanel = useStore((store) => store.showGlobalPanel)

  return (
    <Drawer isOpen={showGlobalPanel}>
      <GlobalConfigDrawerContent />
    </Drawer>
  )
}

export default GlobalConfigDrawer

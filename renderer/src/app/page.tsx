"use client"

import { useRete } from "rete-react-plugin"
import React, { useState } from "react"

import { createEditor } from "@/editor/editor"

const IndexPage = () => {
  const [ref] = useRete(createEditor)
  const [state, setState] = useState(1)

  return (
    <div className="flex flex-col w-full">
      <button onClick={() => setState((p) => p + 1)}>Update: {state}</button>
      <div ref={ref} style={{ height: "100vh", width: "100vw" }} />
    </div>
  )
}

export default IndexPage

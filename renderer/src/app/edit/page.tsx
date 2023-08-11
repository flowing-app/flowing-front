"use client"

import dynamic from "next/dynamic"
import React from "react"

const Editor = dynamic(() => import("./_component/Editor"), {
  ssr: false,
})

const IndexPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Editor />
    </div>
  )
}

export default IndexPage

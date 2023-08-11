import React from "react"

import "./global.css"
import Titlebar from "@/components/Titlebar"

export type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="ja">
      <body className="flex flex-col">
        <Titlebar />
        <div className="w-full grow">{children}</div>
      </body>
    </html>
  )
}

export default Layout

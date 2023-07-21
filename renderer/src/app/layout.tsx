import React from "react"

import "./global.css"

export type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

export default Layout

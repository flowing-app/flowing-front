import React from "react"

import "./global.css"
import Titlebar from "@/components/Titlebar"

export type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="ja">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' https://cdn.jsdelivr.net 'unsafe-eval' blob 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; worker-src 'self' https://cdn.jsdelivr.net blob: localhost"
        />
      </head>
      <body className="flex flex-col">
        <Titlebar />
        <div className="w-full relative overflow-hidden">{children}</div>
      </body>
    </html>
  )
}

export default Layout

import React from "react"

type DrawerProps = {
  children: React.ReactNode
  isOpen: boolean
}

const Drawer = ({ children, isOpen }: DrawerProps) => {
  return (
    <div
      data-open={isOpen}
      className="absolute right-0 w-[50vw] z-10 max-w-[400px] inset-y-0 overflow-y-scroll bg-white transition data-[open='false']:translate-x-[calc(100%+8px)]"
      style={{
        boxShadow: "rgb(100 100 111 / 0.2) 0px 0px 24px 0px",
      }}
    >
      {children}
    </div>
  )
}

export default Drawer

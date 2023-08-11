import React from "react"

type MenuButtonProps = {
  children: string
  onClick?: () => void
}

const MenuButton = ({ children, onClick }: MenuButtonProps) => {
  return (
    <button
      className="w-full border border-slate-200 px-12 py-4 rounded-lg bg-slate-50 hover:bg-slate-100"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default MenuButton

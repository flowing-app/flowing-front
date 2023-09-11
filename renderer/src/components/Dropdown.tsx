import React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

type DropdownProps = {
  children: React.ReactNode
  options: {
    id: string
    label: string
  }[]
}

const Dropdown = ({ children, options }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white shadow-xl rounded-lg overflow-hidden border border-slate-200 min-w-[200px]">
          {options.map(({ id, label }) => (
            <DropdownMenu.Item
              key={id}
              className="bg-white px-4 py-3 text-sm data-highlighted:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {label}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator />
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default Dropdown

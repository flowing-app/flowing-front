import React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

type SwithProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  id?: string
  /** @default md */
  size?: "sm" | "md"
}

const SIZE = {
  sm: 28,
  md: 42,
}

const Switch = ({ checked, onCheckedChange, id, size = "md" }: SwithProps) => {
  return (
    <RadixSwitch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      id={id}
      className="cursor-pointer py-0.5 bg-blackA9 rounded-full relative data-[state=checked]:bg-stone-600 bg-stone-200 outline-none"
      style={{
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
        width: `${SIZE[size]}px`,
        height: `${SIZE[size] / 2 + 4}px`,
      }}
    >
      <RadixSwitch.Thumb
        className="block bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[var(--x-delta)]"
        style={{
          "--x-delta": `${SIZE[size] / 2 - 2}px`,
          width: `${SIZE[size] / 2}px`,
          height: `${SIZE[size] / 2}px`,
        }}
      />
    </RadixSwitch.Root>
  )
}

export default Switch

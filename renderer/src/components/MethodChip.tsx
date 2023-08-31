import React from "react"
import clsx from "clsx"

import { HTTP_METHODS_COLORS, HttpMethod } from "@/utils/httpMethod"

type MethodChipProps = {
  children: HttpMethod
  className?: string
}

const MethodChip = ({ children: method, className }: MethodChipProps) => {
  return (
    <span
      className={clsx(
        "leading-none text-white font-bold px-2 py-1 text-base rounded block",
        className,
      )}
      style={{
        background: HTTP_METHODS_COLORS[method],
      }}
    >
      {method.toUpperCase().slice(0, 3)}
    </span>
  )
}

export default MethodChip

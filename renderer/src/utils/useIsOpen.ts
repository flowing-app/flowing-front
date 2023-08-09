import { useCallback, useMemo, useState } from "react"

export const useIsOpen = (init: boolean) => {
  const [isOpen, setIsOpen] = useState(init)

  const toggleIsOpen = useCallback(() => setIsOpen((prev) => !prev), [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggleIsOpen,
      open,
      close,
    }),
    [close, isOpen, open, toggleIsOpen],
  )
}

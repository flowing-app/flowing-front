import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { FiX } from "react-icons/fi"

export type JsonEditModal = {
  children: React.ReactNode
  className?: string
}

const JsonEditModal = ({ children, className }: JsonEditModal) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={className}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="bg-white fixed w-[600px] max-w-[90%] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl">
          <Dialog.Close>
            <FiX />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default JsonEditModal

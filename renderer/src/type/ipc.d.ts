import type { Ipc } from "../../../electron-src/preload"

declare global {
  interface Window {
    ipc: Ipc
  }
}

import { IpcHandlers } from "./type"

export const applyIpcHandlers = (ipcMain: Electron.IpcMain, ipcHandlers: IpcHandlers) => {
  Object.entries(ipcHandlers).forEach(([channel, handler]) => ipcMain.handle(channel, handler))
}

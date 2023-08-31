import { IpcMainInvokeEvent } from "electron"

export type IpcHandler = (event: IpcMainInvokeEvent, ...args: any[]) => Promise<void> | any
export type IpcHandlers = Record<string, IpcHandler>

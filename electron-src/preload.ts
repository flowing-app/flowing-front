import { contextBridge, ipcRenderer } from "electron"

import type { IpcHandlers } from "./handler"

// makePreloadApis
type IpcApis<Handler extends IpcHandlers> = {
  [Key in keyof Handler]: (
    ...args: Parameters<Handler[Key]> extends [first: unknown, ...rest: infer Rest] ? Rest : []
  ) => ReturnType<Handler[Key]>
}
export const makePreloadApis = <Handlers extends IpcHandlers>(
  ipcRenderer: Electron.IpcRenderer,
  channels: (keyof Handlers & string)[],
): IpcApis<Handlers> => {
  const ipcApis = channels.map((channel) => [
    channel,
    (
      ...args: Handlers[typeof channel] extends infer Handler extends (...args: any) => any
        ? Parameters<Handler> extends [first: unknown, ...rest: infer Rest]
          ? Rest
          : []
        : never
    ) => ipcRenderer.invoke(channel, ...args),
  ])

  return Object.fromEntries(ipcApis)
}

// preload
process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer
})

const ipcApis = makePreloadApis<IpcHandlers>(ipcRenderer, [
  "getOpenApiFile",
  "execScenario",
  "saveScenarioFile",
])

contextBridge.exposeInMainWorld("ipc", ipcApis)

export type Ipc = typeof ipcApis

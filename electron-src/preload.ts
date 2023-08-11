import { contextBridge, ipcRenderer } from "electron"

process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer
})

const ipcApis = {
  execScenario: (dumped: string) => ipcRenderer.invoke("exec-scenario", dumped),
}

contextBridge.exposeInMainWorld("ipc", ipcApis)

export type Ipc = typeof ipcApis

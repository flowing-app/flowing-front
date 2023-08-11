import { contextBridge, ipcRenderer } from "electron"

process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer
})

const ipcApis = {
  execScenario: (dumped: string) => ipcRenderer.invoke("exec-scenario", dumped),
  getOpenApiSpec: () =>
    ipcRenderer.invoke("get-open-api-file") as Promise<{
      content: string
      path: string
      format: "json" | "yaml"
    } | null>,
}

contextBridge.exposeInMainWorld("ipc", ipcApis)

export type Ipc = typeof ipcApis

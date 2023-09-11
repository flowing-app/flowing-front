import fs from "fs/promises"
import path from "path"

import { dialog } from "electron"

import { IpcHandlers as BaseIpcHandlers } from "./lib/electron-rpc"

export const ipcHandlers = {
  execScenario: async (_, dumped: string) => {
    const res = await fetch("http://127.0.0.1:8080/runn", {
      method: "POST",
      body: dumped,
    })
    const data = await res.json()
    return data
  },
  getOpenApiFile: async () => {
    const res = await dialog.showOpenDialog({
      properties: ["openFile", "createDirectory"],
      message: "Open API の定義ファイルを選択",
      filters: [{ name: "Open API", extensions: ["yml", "yaml", "json", "txt"] }],
    })
    if (res.canceled) {
      return
    }
    const filePath = res.filePaths[0]
    if (filePath == null) {
      return
    }

    const buffer = await fs.readFile(filePath)
    const utf8decoder = new TextDecoder()
    const str = utf8decoder.decode(new Uint8Array(buffer))

    // TODO: 最近開いたファイルの追加 https://www.electronjs.org/ja/docs/latest/tutorial/recent-documents
    return {
      content: str,
      path: filePath,
      format: filePath.split(".").pop() === "json" ? "json" : "yaml",
    }
  },
  saveScenarioFile: async (
    _,
    {
      path: savePath,
      files,
      title,
      openApiPath,
    }: {
      path?: string
      files: { title: string; body: string }[]
      title: string
      openApiPath?: string
    },
  ) => {
    if (savePath == null) {
      const res = await dialog.showOpenDialog({
        properties: ["openDirectory"],
        buttonLabel: "保存",
      })
      const savePath = res.filePaths[0]
      if (savePath == null) {
        return
      }

      // ディレクトリの作成
      const dirPath = path.join(savePath, title)
      await fs.mkdir(dirPath)
      const scenarioPath = path.join(dirPath, "runn")
      await fs.mkdir(scenarioPath)

      // ファイルの保存
      await fs.writeFile(
        path.join(dirPath, "meta.json"),
        JSON.stringify({ title, open_api_path: openApiPath, engine: "runn" }),
      )

      await Promise.all(
        files.map((file) => fs.writeFile(path.join(scenarioPath, `${file.title}.yml`), file.body)),
      )
      return dirPath
    } else {
      await Promise.all(
        files.map((file) => fs.writeFile(path.join(savePath, `${file.title}.yml`), file.body)),
      )
    }
  },
} satisfies BaseIpcHandlers

export type IpcHandlers = typeof ipcHandlers

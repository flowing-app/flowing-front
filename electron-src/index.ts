import { join } from "path"
import { format } from "url"
import { ChildProcess } from "child_process"

import { BrowserWindow, app, ipcMain } from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"

import { applyIpcHandlers } from "./lib/electron-rpc"
import { ipcHandlers } from "./handler"

let childProcess: ChildProcess

app.on("ready", async () => {
  applyIpcHandlers(ipcMain, ipcHandlers)

  await prepareNext("./renderer")

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    titleBarOverlay: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
    trafficLightPosition: { x: 16, y: 16 },
  })

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      })

  mainWindow.loadURL(url)

  // const cmd = isDev
  //   ? path.join(__dirname, "../app/bin/flowing")
  //   : path.join(process.resourcesPath, "app/bin/flowing")

  // childProcess = exec(`${cmd} -p 8082`, (...logs) => {
  //   console.log(...logs)
  // })
  // childProcess.stdout?.on("data", (data) => {
  //   console.log(`Child process stdout: ${data}`)
  // })

  // childProcess.stderr?.on("data", (data) => {
  //   console.error(`Child process stderr: ${data}`)
  // })

  // childProcess.on("close", (code) => {
  //   console.log(`Child process exited with code ${code}`)
  // })
})

app.on("window-all-closed", () => {
  if (!childProcess.killed) {
    childProcess.kill()
  }
  return app.quit()
})

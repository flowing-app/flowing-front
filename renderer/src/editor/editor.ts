// @ts-ignore
import { createRoot } from "react-dom/client"
import { NodeEditor, GetSchemes, ClassicPreset } from "rete"
import { AreaPlugin, AreaExtensions } from "rete-area-plugin"
import { ClassicFlow, ConnectionPlugin, getSourceTarget } from "rete-connection-plugin"
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin"
import { DataflowEngine } from "rete-engine"
import { AutoArrangePlugin, Presets as ArrangePresets } from "rete-auto-arrange-plugin"

import { ConnProps, NodeProps } from "./type"
import { ApiCall } from "./nodes/api-call"
import ApiCallNodeComponent from "./ui/api-call"
import { CustomNodeComponent } from "./ui/custom-node"
import SocketComponent from "./ui/socket"
import ConnectionComponent from "./ui/connection"
import { Connection } from "./connection"
import { Socket } from "./socket"

type Schemes = GetSchemes<NodeProps, ConnProps>
type AreaExtra = ReactArea2D<Schemes>

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>()
  const area = new AreaPlugin<Schemes, AreaExtra>(container)
  const connection = new ConnectionPlugin<Schemes, AreaExtra>()
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot })
  const arrange = new AutoArrangePlugin<Schemes, AreaExtra>()

  const dataflow = new DataflowEngine<Schemes>(({ inputs, outputs }) => {
    return {
      inputs: () =>
        Object.entries(inputs)
          .filter(([_, input]) => input.socket instanceof Socket)
          .map(([name]) => name),
      outputs: () =>
        Object.entries(outputs)
          .filter(([_, output]) => output.socket instanceof Socket)
          .map(([name]) => name),
    }
  })

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  })

  render.addPreset(
    Presets.classic.setup({
      customize: {
        connection: (data) => {
          return ConnectionComponent
        },
        node: (data) => {
          if (data.payload instanceof ApiCall) {
            return ApiCallNodeComponent
          }
          return CustomNodeComponent
        },
        socket() {
          return SocketComponent
        },
      },
    }),
  )

  connection.addPreset(
    () =>
      new ClassicFlow({
        canMakeConnection(from, to) {
          return true
        },
        makeConnection(from, to, { editor }) {
          const [source, target] = getSourceTarget(from, to) || [null, null]
          if (!source || !target || from === to) {
            return
          }

          editor.addConnection(
            new Connection(
              editor.getNode(source.nodeId),
              source.key as never,
              editor.getNode(target.nodeId),
              target.key as never,
            ),
          )
          return true
        },
      }),
  )

  arrange.addPreset(ArrangePresets.classic.setup())

  editor.use(area)
  editor.use(dataflow)
  area.use(connection)
  area.use(render)
  area.use(arrange)

  AreaExtensions.simpleNodesOrder(area)
  AreaExtensions.showInputControl(area)
  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  })

  // 以下初期設定
  const apiCall1 = new ApiCall({
    method: "post",
    path: "/health",
    header: {},
    query: {},
    pathParams: {},
    queryParams: {},
    body: {},
  })
  await editor.addNode(apiCall1)

  const apiCall2 = new ApiCall({
    method: "get",
    path: "/health",
    header: {},
    query: {},
    pathParams: {},
    queryParams: {},
    body: {},
  })
  await editor.addNode(apiCall2)

  // const a = new ClassicPreset.Node("A")
  // a.addControl("a", new ClassicPreset.InputControl("text", { initial: "a" }))
  // a.addOutput("a", new ClassicPreset.Output(socket))
  // await editor.addNode(a)

  // const b = new ClassicPreset.Node("B")
  // b.addControl("b", new ClassicPreset.InputControl("text", { initial: "b" }))
  // b.addInput("b", new ClassicPreset.Input(socket))
  // await editor.addNode(b)

  await editor.addConnection(new ClassicPreset.Connection(apiCall1, "success", apiCall2, "input"))

  await area.translate(apiCall1.id, { x: 0, y: 0 })
  await area.translate(apiCall2.id, { x: 270, y: 0 })

  await arrange.layout()

  setTimeout(() => {
    // wait until nodes rendered because they dont have predefined width and height
    AreaExtensions.zoomAt(area, editor.getNodes())
  }, 10)

  return {
    destroy: () => area.destroy(),
  }
}

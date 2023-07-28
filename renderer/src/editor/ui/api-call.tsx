import { ClassicScheme, Presets, RenderEmit } from "rete-react-plugin"

const { RefSocket, RefControl } = Presets.classic

type NodeExtraData = { width?: number; height?: number }

type Props<S extends ClassicScheme> = {
  data: S["Node"] & NodeExtraData
  styles?: () => any
  emit: RenderEmit<S>
}

const ApiCallNodeComponent = <Scheme extends ClassicScheme>({ data, emit }: Props<Scheme>) => {
  const selected = data.selected ?? false
  const { width, height } = data
  const inputs = Object.entries(data.inputs)
  const outputs = Object.entries(data.outputs)

  return (
    <div style={{ width, height }} className="bg-red-400/50">
      API Call
      <div>
        {inputs.map(
          ([key, input]) =>
            input && (
              <div className="output" key={key} data-testid={`output-${key}`}>
                <div className="output-title" data-testid="output-title">
                  {input?.label}
                </div>
                <RefSocket
                  name="input-socket"
                  side="input"
                  emit={emit}
                  socketKey={key}
                  nodeId={data.id}
                  payload={input.socket}
                />
              </div>
            ),
        )}
        {outputs.map(
          ([key, output]) =>
            output && (
              <div className="output" key={key} data-testid={`output-${key}`}>
                <div className="output-title" data-testid="output-title">
                  {output?.label}
                </div>
                <RefSocket
                  name="output-socket"
                  side="output"
                  emit={emit}
                  socketKey={key}
                  nodeId={data.id}
                  payload={output.socket}
                />
              </div>
            ),
        )}
      </div>
    </div>
    // <NodeStyles selected={selected} width={width} height={height}>
    //   <HandleArea>
    //     <Handle type="dashed">...</Handle>
    //   </HandleArea>
    //   <Drag.NoDrag>
    //     <ChatLayout>
    //       <MessagesLayout
    //         ref={messagesLayout}
    //         onWheel={(e) => {
    //           if (!messagesLayout.current) return

    //           const el = messagesLayout.current

    //           if (e.deltaY > 0 && el.scrollTop + el.clientHeight + 1 < el.scrollHeight) {
    //             e.stopPropagation()
    //           } else if (e.deltaY < 0 && el.scrollTop > 0) {
    //             e.stopPropagation()
    //           }
    //         }}
    //       >
    //         <List
    //           itemLayout="horizontal"
    //           dataSource={props.data.messages}
    //           renderItem={(item) => <Message {...item} />}
    //         />
    //       </MessagesLayout>
    //       <TextBox>
    //         <Input
    //           size="large"
    //           value={text}
    //           style={{ fontSize: "1.5em", height: "2em" }}
    //           onInput={(e) => setText((e.target as HTMLInputElement).value)}
    //           placeholder="Your message..."
    //         />
    //         <Button
    //           onClick={() => {
    //             props.data.userSend(text)
    //             setText("")
    //           }}
    //           size="large"
    //           style={{ fontSize: "1.5em", height: "2em" }}
    //           type="primary"
    //         >
    //           Send
    //         </Button>
    //       </TextBox>
    //     </ChatLayout>
    //   </Drag.NoDrag>
    //   <HandleArea>
    //     <Handle type="dashed">...</Handle>
    //   </HandleArea>
    // </NodeStyles>
  )
}

export default ApiCallNodeComponent

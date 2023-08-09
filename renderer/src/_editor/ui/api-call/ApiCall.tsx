import { ClassicScheme, Presets, RenderEmit } from "rete-react-plugin"
import TextareaAutosize from "react-textarea-autosize"
import { useEffect, useRef } from "react"

import { ApiCall } from "../../nodes/api-call"

import SectionAccordion from "./SectionAccordion"

const { RefSocket, RefControl } = Presets.classic

type NodeExtraData = { width?: number; height?: number }

type Props<S extends ClassicScheme> = {
  data: ApiCall
  styles?: () => any
  emit: RenderEmit<S>
}

const ApiCallNodeComponent = <Scheme extends ClassicScheme>({ data, emit }: Props<Scheme>) => {
  const selected = data.selected ?? false
  const { width } = data
  const inputs = Object.entries(data.inputs)
  const outputs = Object.entries(data.outputs)

  const rectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionElm = rectRef.current
    if (sectionElm == null) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = sectionElm.getBoundingClientRect()
      data.width = (data.width / 300) * width
      // data.height = height
    })

    resizeObserver.observe(sectionElm)
    return () => resizeObserver.unobserve(sectionElm)
  }, [data])

  return (
    <div>
      <section
        ref={rectRef}
        style={{ height: "max-content", width: "300px" }}
        data-selected={selected}
        className="bg-[#333333] data-selected:ring ring-sky-500 text-white border-2 border-stone-600 rounded-lg overflow-hidden"
      >
        <h2 className="px-3 py-2 leading-none text-sm bg-stone-600">リクエストを送る</h2>
        <div className="p-3 flex">
          <div className="w-full flex flex-col items-start gap-y-4 flex-1">
            {inputs.map(
              ([key, input]) =>
                input && (
                  <div className="flex items-center gap-x-2" key={key}>
                    <div className="absolute -translate-x-[calc(100%+5px)]">
                      <RefSocket
                        name="input-socket"
                        side="input"
                        emit={emit}
                        socketKey={key}
                        nodeId={data.id}
                        payload={input.socket}
                      />
                    </div>
                    <div className="text-sm">{input?.label}</div>
                  </div>
                ),
            )}
          </div>
          <div className="w-full flex flex-col items-end gap-y-4 flex-1">
            {outputs.map(
              ([key, output]) =>
                output && (
                  <div className="flex items-center gap-x-2" key={key}>
                    <div className="text-sm">{output?.label}</div>
                    <div className="absolute left-[calc(100%-8px)]">
                      <RefSocket
                        name="output-socket"
                        side="output"
                        emit={emit}
                        socketKey={key}
                        nodeId={data.id}
                        payload={output.socket}
                      />
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <SectionAccordion title="バリデーション" badge="VALID" initOpen>
            <div className="bg-[#333333]">
              <TextareaAutosize
                defaultValue={"true"}
                minRows={1}
                className="bg-opacity-0 w-full text-sm bg-[#333333] focus:outline-none p-2 font-mono resize-none"
              />
            </div>
          </SectionAccordion>
          <SectionAccordion title="スキップ条件の指定" badge="SKIP">
            <div className="bg-[#333333]">
              <TextareaAutosize
                defaultValue={"false"}
                minRows={1}
                className="bg-opacity-0 w-full text-sm bg-[#333333] focus:outline-none p-2 font-mono resize-none"
              />
            </div>
          </SectionAccordion>
          <SectionAccordion title="繰り返し回数の指定" badge="LOOP">
            <div className="bg-[#333333]">
              <TextareaAutosize
                defaultValue="1"
                minRows={1}
                className="bg-opacity-0 w-full text-sm bg-[#333333] focus:outline-none p-2 font-mono resize-none"
              />
            </div>
          </SectionAccordion>
        </div>
      </section>
    </div>
  )
}

export default ApiCallNodeComponent

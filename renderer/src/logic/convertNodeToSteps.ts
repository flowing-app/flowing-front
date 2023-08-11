import { Node } from "reactflow"

type ConvertNodesToStepsArg = {
  nodes: Node[]
  title: string
  reqUrl: string
}

export const convertNodesToSteps = ({ nodes, title, reqUrl }: ConvertNodesToStepsArg) => {
  const steps = nodes.reduce((steps, node) => {
    if (node.type !== "api-call") return steps
    const data = node.data
    return {
      ...steps,
      [data.input.summary ?? data.operationId!]: {
        if: data.input.if === "true" ? undefined : data.input.if,
        loop:
          data.input.loop.count === 1
            ? undefined
            : {
                count: data.input.loop.count,
              },
        req: {
          [data.path]: {
            [data.method]: {
              body: {
                "application/json": data.input.body,
              },
            },
          },
        },
        test: data.input.test,
      },
    }
  }, {})
  return {
    desc: title,
    runners: {
      req: reqUrl,
    },
    debug: true,
    steps,
  }
}

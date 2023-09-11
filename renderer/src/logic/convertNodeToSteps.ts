import { Node } from "reactflow"

import { BlockData, Variable } from "@/lib/GuiEditor/type"

type ConvertNodesToStepsArg = {
  nodePath: Node[]
  title: string
  reqUrl: string
  variables: Variable[]
}

export const convertNodesToSteps = ({
  nodePath,
  title,
  reqUrl,
  variables,
}: ConvertNodesToStepsArg) => {
  console.log(nodePath)
  const steps = nodePath.reduce((steps, node) => {
    if (node.type !== "api-call") return steps
    const data: BlockData = node.data

    const headerParameters = data.input.parameters.header
    const headerObj =
      headerParameters.length === 0
        ? {}
        : {
            headers: Object.fromEntries(headerParameters.map(([_, key, value]) => [key, value])),
          }

    const cookieParameters = data.input.parameters.cookie
    const cookieObj =
      cookieParameters.length === 0
        ? {}
        : {
            cookies: Object.fromEntries(cookieParameters.map(([_, key, value]) => [key, value])),
          }

    let path = data.path

    const queryParameter = data.input.parameters.query.reduce((params, [_, key, value]) => {
      if (0 < value.length) {
        params.append(key, value)
      }
      return params
    }, new URLSearchParams())
    const queryStr = queryParameter.toString()

    if (0 < queryStr.length) {
      path += `?${queryStr}`
    }

    data.input.parameters.path.forEach(([_, key, value]) => {
      path = path.replaceAll(`{${key}}`, value)
    })

    return {
      ...steps,
      [data.input.summary || data.operationId!]: {
        if: data.input.if === "true" ? undefined : data.input.if,
        loop:
          data.input.loop.count === 1
            ? undefined
            : {
                count: data.input.loop.count,
              },
        req: {
          [path]: {
            [data.method]: {
              ...headerObj,
              ...cookieObj,
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

  const vars =
    variables.length === 0
      ? {}
      : { vars: Object.fromEntries(variables.map(({ label, value }) => [label, value])) }
  return {
    desc: title,
    runners: {
      req: reqUrl,
    },
    ...vars,
    debug: true,
    steps,
  }
}

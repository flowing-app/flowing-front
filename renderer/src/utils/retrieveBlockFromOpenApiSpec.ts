import { OpenAPIV3_1 } from "openapi-types"
import { dereference } from "@apidevtools/json-schema-ref-parser"

import { BlockData } from "@/lib/GuiEditor/type"
import { Json } from "@/type/json"

import { HTTP_METHODS } from "./httpMethod"
import { getExampleJsonFromRequestBody } from "./getExampleJsonFromMediaTypeObject"

export const retrieveBlockFromOpenApiSpec = async (
  apiSpec: OpenAPIV3_1.Document,
): Promise<BlockData[]> => {
  const resolvedApiSpec = (await dereference(apiSpec)) as OpenAPIV3_1.Document

  return Object.entries(resolvedApiSpec.paths ?? {})
    .map(([path, pathItemObject]) => {
      if (pathItemObject == null) {
        return []
      }
      return HTTP_METHODS.map((method) => {
        const data = pathItemObject[method]
        if (data == null) {
          return []
        }

        const body = getExampleJsonFromRequestBody(data.requestBody) as Json

        return {
          id: `${method}:${path}`,
          path,
          operationId: data.operationId ?? "",
          method,
          input: {
            body,
            summary: "",
            test: "true",
            if: "true",
            loop: {
              count: 1,
            },
          },
          ...data,
        }
      }).flat()
    })
    .flat()
}

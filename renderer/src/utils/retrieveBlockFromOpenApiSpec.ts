import { OpenAPIV3_1 } from "openapi-types"
import { dereference } from "@apidevtools/json-schema-ref-parser"

import { HTTP_METHODS } from "./httpMethod"
import { getExampleJsonFromRequestBody } from "./getExampleJsonFromMediaTypeObject"
import { genId } from "./genId"

import { BlockData } from "@/lib/GuiEditor/type"
import { Json } from "@/type/json"

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
        const baseParameters = data.parameters?.filter(
          (param): param is OpenAPIV3_1.ParameterObject => !("$ref" in param),
        )
        const parameters = {
          path: baseParameters?.filter((param) => param.in === "path") ?? [],
          query: baseParameters?.filter((param) => param.in === "query") ?? [],
          header: baseParameters?.filter((param) => param.in === "header") ?? [],
          cookie: baseParameters?.filter((param) => param.in === "cookie") ?? [],
        }

        return {
          id: `${method}:${path}`,
          path,
          operationId: data.operationId ?? "",
          method,
          input: {
            body,
            parameters: {
              header: parameters.header.map(
                // TODO: Object型に変換
                (param) => [genId(), param.name, "", false] as [string, string, string, boolean],
              ),
              path: parameters.path.map(
                (param) => [genId(), param.name, "", false] as [string, string, string, boolean],
              ),
              query: parameters.query.map(
                (param) => [genId(), param.name, "", false] as [string, string, string, boolean],
              ),
              cookie: parameters.cookie.map(
                (param) => [genId(), param.name, "", false] as [string, string, string, boolean],
              ),
            },
            summary: "",
            test: "true",
            if: "true",
            loop: {
              count: 1,
            },
            scenarioTitle: "",
          },
          result: null,
          ...data,
        }
      }).flat()
    })
    .flat()
}

import { OpenAPIV3_1 } from "openapi-types"

import { Json } from "@/type/json"

export const getExampleJsonFromRequestBody = (
  requestBody: OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject | undefined,
) => {
  if (requestBody == null || "$ref" in requestBody) {
    return {}
  }

  const mediaTypeObject = requestBody.content["application/json"]

  if (mediaTypeObject == null) {
    return {}
  }

  return getExampleJsonFromMediaTypeObject(mediaTypeObject)
}

export const getExampleJsonFromMediaTypeObject = (mediaTypeObject: OpenAPIV3_1.MediaTypeObject) => {
  const schema = mediaTypeObject.schema
  if (schema == null) {
    return {}
  }
  const res = getExampleJsonFromSchemaObject(schema)
  return res
}

export const getExampleJsonFromSchemaObject = (schema: OpenAPIV3_1.SchemaObject): Json => {
  if ("$ref" in schema) {
    return {}
  }
  const example = schema.example ?? schema.examples?.[0]
  if (example != null) {
    return example
  }

  if (schema.type === "array") {
    return getExampleJsonFromSchemaObject(schema.items)
  }

  if (schema.type === "boolean") {
    return true
  }

  if (schema.type === "integer") {
    return 0
  }

  if (schema.type === "number") {
    return 0.0
  }

  if (schema.type === "string") {
    return "string"
  }

  if (schema.type === "null") {
    return null
  }

  if (schema.properties == null) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(schema.properties).map(([key, childSchema]) => [
      key,
      getExampleJsonFromSchemaObject(childSchema),
    ]),
  )
}

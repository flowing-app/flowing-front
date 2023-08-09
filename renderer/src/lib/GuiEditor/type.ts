import { OpenAPIV3_1 } from "openapi-types"

import { HttpMethod } from "@/utils/httpMethod"
import { Json } from "@/type/json"

type Loop = {
  count?: number
  // until?: string
  // interval?: string
  // minInterval?: string
  // maxInterval?: string
  // jitter?: number
  // multiplier?: number
}

export type BlockData = {
  id: string
  path: string
  method: HttpMethod
  // summary?: string
  // operationId?: string
} & Omit<OpenAPIV3_1.OperationObject, "method" | "id"> & {
    input: {
      test: string
      summary: string
      body: Json
      if: string
      loop: Loop
    }
  }

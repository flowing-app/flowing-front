import { Json } from "@/type/json"

export type ApiCallStep = {
  method: string
  path: string
  header: Record<string, string>
  query: Record<string, string>
  pathParams: Record<string, string>
  queryParams: Record<string, string>
  body: Json
}

export type ScenarioStep = {
  type: "api"
  api: ApiCallStep
}

export type ScenarioSchema = {
  steps: ScenarioStep[]
}

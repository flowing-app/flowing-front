import { ClassicPreset } from "rete"

import { Json } from "@/type/json"
import { ScenarioSchema } from "@/domain/ScenarioSchema"

import { Socket } from "../socket"

export type ApiCallModel = {
  method: string
  path: string
  header: Record<string, string>
  query: Record<string, string>
  pathParams: Record<string, string>
  queryParams: Record<string, string>
  body: Json
}

export class ApiCall extends ClassicPreset.Node<
  {
    input: ClassicPreset.Socket
  },
  { success: ClassicPreset.Socket; failure: ClassicPreset.Socket },
  {}
> {
  public width = 300
  public height = 260

  constructor(private apiModel: ApiCallModel) {
    super("API Call")
    this.addInput("input", new ClassicPreset.Input(new Socket(), "Send"))
    this.addOutput("success", new ClassicPreset.Output(new Socket(), "Success"))
    this.addOutput("failure", new ClassicPreset.Output(new Socket(), "Failure"))
  }

  data(inputs: { input?: ScenarioSchema[] }) {
    const scenarioSteps = inputs.input ?? []

    return {
      success: [
        ...scenarioSteps,
        {
          type: "api",
          api: this.apiModel,
        },
      ],
      failure: [
        ...scenarioSteps,
        {
          type: "api",
          api: this.apiModel,
        },
      ],
    }
  }

  public updateApiModel(apiModel: Partial<ApiCallModel>) {
    this.apiModel = { ...this.apiModel, ...apiModel }
  }
}

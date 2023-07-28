import { ClassicPreset } from "rete"

import { Socket } from "../socket"

import { Json } from "@/type/json"
import { ScenarioSchema } from "@/domain/ScenarioSchema"

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
  public width = 200
  public height = 120

  constructor(private apiModel: ApiCallModel) {
    super("API Call")
    this.addInput("input", new ClassicPreset.Input(new Socket(), "Input"))
    this.addOutput("success", new ClassicPreset.Output(new Socket(), "Success"))
    this.addOutput("failure", new ClassicPreset.Output(new Socket(), "Failure"))
  }

  data(inputs: { input: ScenarioSchema[] }) {
    const scenarioSteps = inputs.input

    return {
      value: [
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

import { ClassicPreset } from "rete"

import { ScenarioSchema } from "@/domain/ScenarioSchema"

export class End extends ClassicPreset.Node<{ end: ClassicPreset.Socket }, {}, {}> {
  public width = 300
  public height = 180

  constructor() {
    super("End")
  }

  data(inputs: { input: ScenarioSchema[] }) {
    const scenarioSteps = inputs.input

    return {
      value: scenarioSteps,
    }
  }
}

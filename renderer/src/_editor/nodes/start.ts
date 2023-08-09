import { ClassicPreset } from "rete"

export class Start extends ClassicPreset.Node<
  {},
  {
    start: ClassicPreset.Socket
  },
  {}
> {
  public width = 300
  public height = 180

  constructor() {
    super("Start")
  }

  data() {
    return {
      value: [],
    }
  }
}

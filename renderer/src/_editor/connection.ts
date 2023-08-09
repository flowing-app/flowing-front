import { ClassicPreset } from "rete"

import { NodeProps } from "./type"

export class Connection<A extends NodeProps, B extends NodeProps> extends ClassicPreset.Connection<
  A,
  B
> {
  isLoop?: boolean
}

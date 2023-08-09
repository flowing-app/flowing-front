import { ClassicScheme, Presets, RenderEmit } from "rete-react-plugin"

type Props<S extends ClassicScheme> = {
  data: S["Node"]
  styles?: () => any
  emit: RenderEmit<S>
}

export function CustomNodeComponent<S extends ClassicScheme>(props: Props<S>) {
  return <Presets.classic.Node {...props} />
}

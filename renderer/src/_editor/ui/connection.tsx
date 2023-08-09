import * as React from "react"
import { ClassicScheme, Presets } from "rete-react-plugin"

const { Connection } = Presets.classic

const ConnectionComponent = (props: {
  data: ClassicScheme["Connection"] & { isLoop?: boolean }
}) => {
  return <Connection {...props} styles={() => ({ stroke: "#00ff00" })} />
}

export default ConnectionComponent

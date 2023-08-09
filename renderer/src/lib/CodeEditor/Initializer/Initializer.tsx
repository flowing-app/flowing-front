import { useFlowingJsonExtension } from "./useFlowingJsonLang"
import { useFlowingLang } from "./useFlowingLang"

export const Initializer = () => {
  useFlowingLang()
  useFlowingJsonExtension()

  return null
}

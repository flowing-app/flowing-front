import { Connection } from "./connection"
import { ApiCall } from "./nodes/api-call"
import { End } from "./nodes/end"
import { Start } from "./nodes/start"

export type NodeProps = ApiCall | Start | End
export type ConnProps =
  | Connection<ApiCall, ApiCall>
  | Connection<Start, ApiCall>
  | Connection<ApiCall, End>

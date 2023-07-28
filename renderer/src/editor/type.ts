import { Connection } from "./connection"
import { ApiCall } from "./nodes/api-call"

export type NodeProps = ApiCall
export type ConnProps = Connection<ApiCall, ApiCall>

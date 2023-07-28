import { ClassicPreset } from "rete"

const SocketComponent = <T extends ClassicPreset.Socket>(props: { data: T }) => {
  return (
    <div className="bg-blue-400 px-2 py-1 rounded-full text-sm">
      {props.data.name ?? "ソケット"}
    </div>
  )
}

export default SocketComponent

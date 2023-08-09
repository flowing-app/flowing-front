import { ClassicPreset } from "rete"

const SocketComponent = <T extends ClassicPreset.Socket>(props: { data: T }) => {
  return (
    <div className="bg-stone-600 w-4 h-4 rounded-full text-sm hover:bg-stone-400 hover:cursor-pointer"></div>
  )
}

export default SocketComponent

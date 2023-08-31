import clsx from "clsx"
import { IconType } from "react-icons"

type ChipButtonProps = {
  color: "blue" | "gray"
  icon: IconType
  children: React.ReactNode
  onClick: () => void
}

const ChipButton = ({ color, icon: Icon, children, onClick }: ChipButtonProps) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex items-center bg-white gap-x-2 border cursor-pointer hover:bg-sky-50 rounded-full pl-3 pr-4 py-1 leading-none",
      color === "blue"
        ? "text-sky-600/80 border-sky-600/20"
        : "text-slate-600/80 border-slate-600/20",
    )}
  >
    <Icon size={14} />
    <div className="text-sm">{children}</div>
  </button>
)

export default ChipButton

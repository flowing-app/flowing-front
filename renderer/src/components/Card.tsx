import clsx from "clsx"

type CardProps = {
  children: React.ReactNode
  selected?: boolean
  compact?: boolean
  className?: string
}

const Card = ({ children, selected, compact, className }: CardProps) => (
  <div
    data-selected={selected}
    className={clsx(
      "bg-white data-[selected='true']:ring h-max ring-sky-300 shadow text-slate-600 rounded-lg overflow-hidden border border-slate-300 flex flex-col gap-y-2",
      compact ? "px-4 py-2 border-slate-200/80" : "p-4 border-slate-300",
      className,
    )}
  >
    {children}
  </div>
)

export default Card

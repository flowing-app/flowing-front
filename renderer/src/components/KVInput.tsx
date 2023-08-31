import { FiLock, FiMinus } from "react-icons/fi"

type KVInputProps = {
  valueK: string
  onChangeK?: (value: string) => void
  valueV: string
  onChangeV?: (value: string) => void
  lockedKey?: boolean
  onClickDelete?: () => void
}

const KVInput = ({
  valueK,
  onChangeK,
  valueV,
  onChangeV,
  lockedKey = false,
  onClickDelete,
}: KVInputProps) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          className="border bg-slate-50 disabled:text-slate-500 py-1 px-3 w-[120px] shrink-0 border-slate-200 border-r-transparent placeholder:text-slate-300 focus:outline-none disabled:hover:cursor-not-allowed"
          placeholder="Key"
          value={valueK}
          onChange={(e) => onChangeK?.(e.target.value)}
          disabled={lockedKey}
        />
        {lockedKey && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300">
            <FiLock />
          </div>
        )}
      </div>
      <input
        className="border bg-slate-50 py-1 px-3 grow border-slate-200 placeholder:text-slate-300 focus:outline-none"
        placeholder="Value"
        value={valueV}
        onChange={(e) => onChangeV?.(e.target.value)}
      />
      <button
        className="p-1 m-0.5 rounded text-slate-400 hover:text-slate-600 disabled:opacity-0"
        disabled={lockedKey}
        onClick={onClickDelete}
      >
        <FiMinus />
      </button>
    </div>
  )
}

export default KVInput

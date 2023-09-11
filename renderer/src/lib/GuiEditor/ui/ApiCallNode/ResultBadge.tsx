import clsx from "clsx"
import React from "react"
import { FiCheck, FiSlash, FiX } from "react-icons/fi"

type ResultBadgeProps = {
  result: "success" | "failure" | "skipped"
}

const ResultBadge = ({ result }: ResultBadgeProps) => {
  return (
    <div
      className={clsx(
        "py-1 leading-none px-3 flex items-center rounded-full border-2 font-bold gap-x-1",
        result === "success"
          ? "border-green-500 text-green-500"
          : result === "failure"
          ? "border-rose-500 text-rose-500"
          : "border-slate-400 text-slate-400",
      )}
    >
      {result === "success" ? (
        <>
          <FiCheck size={24} />
          成功
        </>
      ) : result === "failure" ? (
        <>
          <FiX size={24} />
          失敗
        </>
      ) : (
        <>
          <FiSlash size={24} />
          未実行
        </>
      )}
    </div>
  )
}

export default ResultBadge

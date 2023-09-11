import clsx from "clsx"
import React, { useRef, useState } from "react"
import useSWRMutate from "swr/mutation"

import { useStore } from "@/store"

const AiInput = () => {
  const { addAiSuggestedBlocks, acceptAiSuggestions, denyAiSuggestions } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")

  const ref = useRef<HTMLTextAreaElement>(null)

  const { reset, trigger, isMutating, data } = useSWRMutate(["ai-generate"], async () => {
    // await waitFor(4000)
    if (0 < value.length) {
      await addAiSuggestedBlocks(value)
    }
    return true
  })

  const handleSend = async () => {
    setValue("")
    setIsOpen(false)
    await trigger()
    setTimeout(() => setValue(""), 0)
    ref.current?.blur()
  }

  const handleAccept = () => {
    reset()
    acceptAiSuggestions()
    ref.current?.blur()
    setIsOpen(false)
  }

  const handleDeny = () => {
    reset()
    denyAiSuggestions()
    ref.current?.blur()
    setIsOpen(false)
  }

  return (
    <>
      <style jsx>{`
        @keyframes gradation {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        @keyframes rotation {
          0% {
            transform: scale(0.4);
            opacity: 1;
            border-radius: 18px;
          }
          50% {
            transform: scale(1.2) rotate(90deg);
            opacity: 0.5;
            border-radius: 12px;
          }
          100% {
            transform: scale(0.4) rotate(180deg);
            opacity: 1;
            border-radius: 18px;
          }
        }
        @keyframes loading {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: rotate(360deg) translateX(-50%);
          }
        }
      `}</style>
      {/* TODO: ローディングのアニメーション */}
      <div className={clsx("fixed left-1/2 bottom-[100px]")}>
        <div
          tabIndex={1}
          className={clsx(
            "group cursor-pointer -translate-x-1/2 rounded-3xl shadow-lg transition-all duration-300 flex items-center justify-center opacity-90 flex-col",
            !isOpen && !(data === true) && "hover:scale-125",
            isMutating && "delay-100 duration-400",
          )}
          style={{
            width: data === true ? "320px" : isOpen ? "416px" : "64px",
            height: data === true ? "64px" : isOpen ? "128px" : "64px",
            padding: data === true ? "8px" : isOpen ? "8px 8px 24px 8px" : "0px",
            background: isMutating
              ? "linear-gradient(136deg, #FF4BCD 0%, #F46285 24.54%, #D65CEA 58.79%, #FD347C 98.16%)"
              : "linear-gradient(136deg, #4B68FF 0%, #9162F4 24.54%, #D65CEA 58.79%, #FD347C 98.16%)",
            boxShadow: isMutating ? "0px 0px 10px 5px rgba(253, 52, 124, 0.5)" : undefined,
            backgroundPosition: "0% 0%",
            backgroundSize: "150% 150%",
            animation: "gradation 3s linear infinite",
            // animation: "gradation 3s linear infinite, loading 3s linear infinite",
            animationDirection: "alternate",
          }}
          onClick={() => {
            setIsOpen(true)
            ref.current?.focus()
          }}
        >
          <div
            className={clsx(
              "transition-all shadow duration-300",
              data === true
                ? "bg-white/80 rounded-xl w-[160px] h-[40px] px-6 py-2 text-[#8157d8] font-bold shadow translate-x-[64px]"
                : isMutating
                ? "animate-spin bg-white/80 w-[36px] h-[36px] rounded-xl !text-transparent !duration-500"
                : isOpen
                ? "bg-white/80 rounded-2xl h-[96px] w-[400px]"
                : "bg-white/30 group-hover:bg-white/60 rounded-xl w-[12px] h-[12px] group-hover:duration-150 group-hover:animate-[2s_linear_0s_infinite_rotation] group-hover:w-[36px] group-hover:h-[36px]",
            )}
          >
            <textarea
              ref={ref}
              placeholder={isMutating ? "" : "AIに何してほしい？"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                // TODO: form でもいけるか確認
                if (e.key === "Enter") {
                  handleSend()
                }
              }}
              onBlur={() => {
                if (value.length === 0) {
                  setIsOpen(false)
                }
              }}
              rows={3}
              className={clsx(
                " scrollbar-hidden focus:outline-none resize-none bg-transparent font-bold text-[#8157d8]",
                data === true
                  ? "hidden"
                  : isMutating
                  ? "!text-transparent placeholder:opacity-0 delay-0 duration-500"
                  : isOpen
                  ? "rounded-2xl px-4 py-3 h-[96px] w-[400px] placeholder:transition placeholder:delay-300 placeholder:text-[#8157d8]/50"
                  : "rounded-xl w-[12px] h-[12px] placeholder:opacity-0",
              )}
            />
            {/* Button */}
            <div
              className={clsx(
                "text-white/80 hover:text-white rounded-xl w-[120px] h-[40px] transition duration-300 top-1/2 -translate-y-1/2 grid place-items-center hover:bg-white/20 absolute -left-[130px]",
                data === true
                  ? "opacity-100 duration-1000 delay-100"
                  : "opacity-0 pointer-events-none",
              )}
              onClick={(e) => {
                e.stopPropagation()
                handleDeny()
              }}
            >
              キャンセル
            </div>
            <div
              className={clsx(
                "w-[160px] rounded-xl hover:bg-white/50 translate-x-[-24px] h-[40px] relative top-1/2 -translate-y-1/2 grid place-items-center",
                data === true ? "text-opacity-100 transition delay-100" : "hidden text-opacity-0",
                // data === true
                //   ? "bg-white/80 rounded-xl px-6 py-2 text-[#8157d8] font-bold shadow"
                //   : "hidden",
              )}
              onClick={(e) => {
                e.stopPropagation()
                handleAccept()
              }}
            >
              AIの提案を採用
            </div>
          </div>
          <div
            data-state={isOpen ? "open" : ""}
            className="w-full justify-end px-6 bottom-2 absolute data-[state='open']:opacity-100 flex opacity-0 data-[state='open']:transition transition-none duration-300 delay-300"
          >
            <div className="text-white/80 font-bold text-xs translate-y-1">
              <kbd className="font-sans">Enter</kbd>で送信
            </div>
          </div>
          {/* {data === true && (
            <div className="flex gap-x-2 w-full p-4">
              <button className="rounded-xl px-6 py-2 font-bold text-white/80">拒否</button>
              <button className="bg-white/80 rounded-xl px-6 py-2 text-[#8157d8] font-bold shadow">
                AIの提案を採用
              </button>
            </div>
          )} */}
        </div>
      </div>
    </>
  )
}

export default AiInput

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const Titlebar = () => {
  const router = useRouter()

  return (
    <div className="titlebar border-b bg-white pl-[100px] z-10 border-slate-200 flex items-center p-4 gap-x-2 text-slate-600">
      <div className="flex items-center gap-x-1">
        <button className="p-2 hover:bg-slate-100 rounded" onClick={() => router.back()}>
          <FiChevronLeft size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded" onClick={() => router.forward()}>
          <FiChevronRight size={18} />
        </button>
      </div>
      <nav>
        <Link href="/" className="text-sm px-4 p-2 hover:bg-slate-100 rounded">
          HOME
        </Link>
      </nav>
    </div>
  )
}

export default Titlebar

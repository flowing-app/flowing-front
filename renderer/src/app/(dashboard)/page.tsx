"use client"

import React from "react"
import { useRouter } from "next/navigation"

import MenuButton from "./_component/MenuButton"

import { ipc } from "@/utils/ipc"
import { useStore } from "@/store"

const UploadPage = () => {
  const router = useRouter()
  const setOpenApi = useStore((store) => store.setOpenApi)

  const handleGetOpenApiSpec = async () => {
    const res = await ipc.getOpenApiSpec()
    if (res == null) {
      return
    }
    setOpenApi(res.content, res.format)
    router.push("/edit")
  }

  return (
    <div className="w-full flex items-center flex-col py-10">
      <h1 className="text-[64px] font-bold">Flowing</h1>
      <p className="font-bold">APIシナリオテスト構築ツール</p>
      <section className="mt-10 flex flex-col w-full gap-y-4 max-w-lg">
        <h2 className="font-bold">新規作成</h2>
        <div className="flex w-full flex-col items-center gap-y-4">
          <MenuButton onClick={handleGetOpenApiSpec}>OpenAPIを利用する</MenuButton>
          <MenuButton>OpenAPIを利用しない</MenuButton>
        </div>
      </section>
    </div>
  )
}

export default UploadPage

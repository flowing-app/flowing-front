import React from "react"
import { FiPlus, FiX } from "react-icons/fi"

import Section from "@/components/Section"
import KVInput from "@/components/KVInput"
import { useStore } from "@/store"
import { genId } from "@/utils/genId"

const GlobalConfigDrawerContent = () => {
  const setShowGlobalPanel = useStore((store) => store.setShowGlobalPanel)
  const [meta, setMeta] = useStore((store) => [store.meta, store.setMeta])
  const [variables, setVariables] = useStore((store) => [store.variables, store.setVariables])

  const addVariable = () => {
    setVariables([...variables, { id: genId(), label: "", value: "" }])
  }

  const updateVariable = (index: number, label: string, value: string) => {
    setVariables(
      variables.map((variable, i) => (i !== index ? variable : { ...variable, label, value })),
    )
  }

  const deleteVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index))
  }

  return (
    <section className="flex flex-col">
      <div className="p-4 flex items-center gap-x-4">
        <h2 className="text-lg font-bold grow text-slate-600">シナリオ設定</h2>
        <button onClick={() => setShowGlobalPanel(false)} className="shrink-0">
          <FiX />
        </button>
      </div>
      <hr />
      <div className="p-4 flex flex-col gap-y-6">
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-slate-500">タイトル</label>
          <input
            value={meta.title}
            onChange={(e) => setMeta({ title: e.target.value })}
            placeholder="Title"
            className="border text-sm disabled:text-slate-500 py-1 px-3 w-full border-slate-200 bg-white placeholder:text-slate-300 focus:outline-none text-slate-600"
          />
        </div>
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-slate-500">リクエストURL</label>
          <input
            value={meta.reqUrl}
            onChange={(e) => setMeta({ reqUrl: e.target.value })}
            placeholder="http://localhost:8080"
            type="url"
            className="border text-sm disabled:text-slate-500 py-1 px-3 w-full border-slate-200 bg-white placeholder:text-slate-300 focus:outline-none text-slate-600"
          />
        </div>
      </div>
      <hr />
      <Section title="グローバル変数" className="p-4">
        <div className="overflow-hidden mt-1 text-sm max-h-[280px] text-slate-500">
          {variables.map(({ id, label, value }, i) => {
            return (
              <KVInput
                key={id}
                valueK={label}
                valueV={value}
                onChangeK={(label) => updateVariable(i, label, value)}
                onChangeV={(value) => updateVariable(i, label, value)}
                onClickDelete={() => deleteVariable(i)}
              />
            )
          })}
          <button
            onClick={addVariable}
            className="flex items-center gap-x-1 text-xs px-2 py-1 text-slate-400 hover:text-slate-600 mt-1"
          >
            <FiPlus />
            <div>追加する</div>
          </button>
        </div>
      </Section>
    </section>
  )
}

export default GlobalConfigDrawerContent

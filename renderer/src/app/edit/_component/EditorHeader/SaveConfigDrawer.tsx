import React from "react"
import { FiChevronDown, FiX } from "react-icons/fi"

import Drawer from "@/components/Drawer"
import { useStore } from "@/store"

type SaveConfigDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const SaveConfigDrawer = ({ isOpen, onClose }: SaveConfigDrawerProps) => {
  const saveScenarioFile = useStore((store) => store.saveScenarioFile)
  const [fileMeta, updateMeta] = useStore((store) => [store.fileMeta, store.updateFileMeta])

  const handleSaveScenario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await saveScenarioFile()
  }

  return (
    <Drawer isOpen={isOpen}>
      <form onSubmit={handleSaveScenario}>
        <div className="p-4 flex items-center gap-x-4">
          <h2 className="text-lg font-bold grow text-slate-600">シナリオファイルを保存する</h2>
          <button type="button" onClick={onClose} className="shrink-0">
            <FiX />
          </button>
        </div>
        <hr />
        <div className="px-4 pt-8 pb-10 flex flex-col gap-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-slate-500">
              タイトル
            </label>
            <div className="flex items-center mt-2 gap-x-2">
              <input
                id="title"
                name="title"
                type="text"
                className="px-4 py-2 w-full rounded-lg focus:outline-none border border-slate-200 focus:border-slate-400 h-[42px]"
                placeholder="test_scenario"
                required
                value={fileMeta.title}
                onChange={(e) => updateMeta({ title: e.target.value })}
              />
              <div className="py-2 text-slate-500">.yml</div>
            </div>
          </div>
          <div>
            <label htmlFor="engine" className="block text-sm font-bold text-slate-500">
              実行ツール
            </label>
            <div className="relative mt-2">
              <select
                name="engine"
                id="engine"
                className="px-4 py-2 w-full rounded-lg focus:outline-none border border-slate-200 focus:border-slate-400 h-[42px] appearance-none"
              >
                <option value="">runn</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <FiChevronDown />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="p-4 flex space-x-2 justify-end">
          <button
            className="border border-slate-400 text-sm font-bold text-slate-700 px-4 py-2.5 leading-none rounded-lg"
            onClick={onClose}
            type="button"
          >
            キャンセル
          </button>
          <button
            className="bg-slate-700 border border-slate-700 text-sm font-bold text-white px-4 py-2.5 leading-none rounded-lg"
            type="submit"
          >
            保存する
          </button>
        </div>
      </form>
    </Drawer>
  )
}

export default SaveConfigDrawer

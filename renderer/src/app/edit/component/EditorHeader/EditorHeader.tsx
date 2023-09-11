import React, { useState } from "react"
import { FiSave, FiSettings } from "react-icons/fi"

import HeaderButton from "./HeaderButton"
import SaveConfigDrawer from "./SaveConfigDrawer"
import ExecButtonts from "./ExecButtonts"

import { useStore } from "@/store"

const EditorHeader = () => {
  const saveScenarioFile = useStore((store) => store.saveScenarioFile)
  const execTest = useStore((store) => store.execTest)
  const toggleShowGlobalPanel = useStore((store) => store.toggleShowGlobalPanel)
  const fileTitle = useStore((store) => store.fileMeta.title)

  const [isOpenTitleInputModal, setIsOpenTitleInputModal] = useState(false)

  const handleClickSaveScenario = async () => {
    if (fileTitle.length === 0) {
      setIsOpenTitleInputModal(true)
    } else {
      await saveScenarioFile()
    }
  }

  return (
    <>
      <div
        className="border-b border-b-slate-200 px-4 py-1 h-10 z-10 relative grid"
        style={{
          gridTemplateColumns: "200px 1fr 200px",
        }}
      >
        <div />
        <div className="place-self-center">
          <ExecButtonts onExec={execTest} />
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <HeaderButton onClick={handleClickSaveScenario}>
            <FiSave size={14} />
            <div className="text-sm font-bold leading-none">保存</div>
          </HeaderButton>
          <HeaderButton onClick={toggleShowGlobalPanel}>
            <FiSettings size={14} />
            <div className="text-sm font-bold leading-none">シナリオ設定</div>
          </HeaderButton>
        </div>
      </div>
      <SaveConfigDrawer
        isOpen={isOpenTitleInputModal}
        onClose={() => setIsOpenTitleInputModal(false)}
      />
    </>
  )
}

export default EditorHeader

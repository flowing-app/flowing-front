type HeaderButtonProps = {
  children: React.ReactNode
  onClick: () => void
}
const HeaderButton = ({ children, onClick }: HeaderButtonProps) => {
  return (
    <button
      className="flex items-center gap-x-1 text-slate-500 py-2 px-2 rounded-lg hover:bg-slate-100"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default HeaderButton

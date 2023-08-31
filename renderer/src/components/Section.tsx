import { FiCode } from "react-icons/fi"

type SectionProps = { title: string; children: React.ReactNode; className?: string }

const Section = ({ title, children, className }: SectionProps) => {
  return (
    <section className={className}>
      <h3 className="font-bold text-slate-600">
        <FiCode className="inline mr-2" />
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default Section

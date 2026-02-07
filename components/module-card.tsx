import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Module } from "@/lib/module-data"

export function ModuleCard({ module, progress = 0 }: { module: Module; progress?: number }) {
  const levelColors = {
    beginner: "bg-terracotta/10 text-terracotta",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-purple-100 text-purple-700",
  }

  return (
    <Link href={`/modules/${module.id}`}>
      <Card className="group cursor-pointer border-sand-200 bg-white p-6 transition-all hover:shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${levelColors[module.level]}`}
          >
            {module.id}
          </div>
          <div className="relative h-12 w-12 flex items-center justify-center">
            <svg className="absolute inset-0 h-12 w-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" className={progress >= 100 ? "text-green-500/20" : "text-terracotta/20"} strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" className={progress >= 100 ? "text-green-500" : "text-terracotta"} strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className={`text-xs font-semibold ${progress >= 100 ? "text-green-500" : "text-terracotta"}`}>{progress}%</span>
          </div>
        </div>

        <h3 className="mb-3 text-xl font-bold text-charcoal group-hover:text-terracotta">{module.title}</h3>

        <p className="mb-4 leading-relaxed text-charcoal/70">{module.description}</p>

        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold text-charcoal/60">Topics Covered:</p>
          <div className="flex flex-wrap gap-2">
            {module.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-terracotta/30 bg-terracotta/5 px-3 py-1 text-xs text-terracotta"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-terracotta">
          <span>Start Module</span>
          <span>→</span>
        </div>
      </Card>
    </Link>
  )
}

import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Module } from "@/lib/module-data"

export function ModuleCard({ module }: { module: Module }) {
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
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-terracotta">•</span>
            <span className="text-sm font-medium text-charcoal/60">0%</span>
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

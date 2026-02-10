"use client"

import Link from "next/link"
import { modules } from "@/lib/module-data"
import { LearningAreaCard } from "@/components/learning-area-card"
import { ModuleProgressSidebar } from "@/components/module-progress-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useModuleProgress } from "@/hooks/use-module-progress"

export default function ModuleContentClient({ id }: { id: string }) {
  const module = modules.find((m) => m.id.toString() === id)
  const { vocabulary: vocabularyProgress, reading: readingProgress, writing: writingProgress, grammar: grammarProgress, overall: overallProgress } = useModuleProgress(id)

  const levelColors = {
    alphabet: "bg-blue-100 text-blue-700 border-blue-300",
    beginner: "bg-terracotta/10 text-terracotta border-terracotta/30",
    intermediate: "bg-amber-100 text-amber-700 border-amber-300",
    advanced: "bg-purple-100 text-purple-700 border-purple-300",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/modules">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Modules
        </Button>
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Module Info */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <span
              className={`inline-block rounded-full border px-4 py-1 text-sm font-medium capitalize ${
                levelColors[module.level as keyof typeof levelColors]
              }`}
            >
              {module.level}
            </span>
          </div>

          <p className="mb-2 text-sm text-charcoal/60">Module {module.id}</p>

          <h1 className="mb-4 text-balance font-serif text-4xl font-bold text-charcoal">
            {module.title}
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-charcoal/70">{module.description}</p>

          <div className="mb-8">
            <h3 className="mb-3 font-semibold text-charcoal">Topics Covered:</h3>
            <div className="flex flex-wrap gap-2">
              {module.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-terracotta/30 bg-terracotta/5 px-4 py-1.5 text-sm text-terracotta"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Areas */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-charcoal">Learning Areas</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <LearningAreaCard
                icon="vocabulary"
                title="Vocabulary"
                description="Learn essential words and phrases for this module"
                progress={vocabularyProgress}
                href={`/modules/${module.id}/vocabulary`}
              />

              <LearningAreaCard
                icon="grammar"
                title="Grammar"
                description="Master grammar concepts and sentence structures"
                progress={grammarProgress}
                href={`/modules/${module.id}/grammar`}
              />

              <LearningAreaCard
                icon="reading"
                title="Reading"
                description="Practice reading comprehension with relevant texts"
                progress={readingProgress}
                href={`/modules/${module.id}/reading`}
              />

              <LearningAreaCard
                icon="writing"
                title="Writing"
                description="Develop writing skills through guided exercises"
                progress={writingProgress}
                href={`/modules/${module.id}/writing`}
              />
            </div>
          </section>
        </div>

        {/* Progress Sidebar */}
        <ModuleProgressSidebar
          vocabularyProgress={vocabularyProgress}
          grammarProgress={grammarProgress}
          readingProgress={readingProgress}
          writingProgress={writingProgress}
          overallProgress={overallProgress}
        />
      </div>
    </div>
  )
}

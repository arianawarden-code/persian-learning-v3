"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { modules, moduleContent } from "@/lib/module-data"
import { LearningAreaCard } from "@/components/learning-area-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import {
  getModuleReadingProgress,
  getModuleWritingProgress,
  getModuleGrammarProgress,
} from "@/lib/progress-storage"

function ModuleLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 h-10 w-40 animate-pulse rounded bg-sand-100" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-32 animate-pulse rounded bg-sand-100" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-sand-100" />
          <div className="h-20 w-full animate-pulse rounded bg-sand-100" />
        </div>
        <div className="lg:col-span-1">
          <div className="h-64 w-full animate-pulse rounded-2xl bg-sand-100" />
        </div>
      </div>
    </div>
  )
}

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
        </div>
      </header>

      <Suspense fallback={<ModuleLoading />}>
        <ModuleContent params={params} />
      </Suspense>
    </div>
  )
}

async function ModuleContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { id } = resolvedParams
  return <ModuleContentClient id={id} />
}

function ModuleContentClient({ id }: { id: string }) {
  const module = modules.find((m) => m.id.toString() === id)
  const content = moduleContent[id as keyof typeof moduleContent]

  const [readingProgress, setReadingProgress] = useState(0)
  const [writingProgress, setWritingProgress] = useState(0)
  const [grammarProgress, setGrammarProgress] = useState(0)

  useEffect(() => {
    if (!module) return

    const updateProgress = () => {
      const totalStories = content?.reading?.length || 0
      const totalWritingExercises = content?.writing?.length || 0
      const totalGrammarExercises = content?.grammar?.length || 0

      setReadingProgress(getModuleReadingProgress(id, totalStories))
      setWritingProgress(getModuleWritingProgress(id, totalWritingExercises))
      setGrammarProgress(getModuleGrammarProgress(id, totalGrammarExercises))
    }

    updateProgress()

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "writing-progress" ||
        e.key === "reading-progress" ||
        e.key === "grammar-progress"
      ) {
        updateProgress()
      }
    }

    // NEW: listen to our custom event fired by progress-storage.ts
    const handleProgressUpdated = () => updateProgress()

    // Also listen for focus events to refresh progress when returning to the page
    window.addEventListener("focus", updateProgress)
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("progress-updated", handleProgressUpdated)

    return () => {
      window.removeEventListener("focus", updateProgress)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("progress-updated", handleProgressUpdated)
    }
  }, [module, id, content])

  if (!module) {
    notFound()
  }

  const levelColors = {
    alphabet: "bg-blue-100 text-blue-700 border-blue-300",
    beginner: "bg-terracotta/10 text-terracotta border-terracotta/30",
    intermediate: "bg-amber-100 text-amber-700 border-amber-300",
    advanced: "bg-purple-100 text-purple-700 border-purple-300",
  }

  const overallProgress = Math.round((readingProgress + writingProgress + grammarProgress) / 3)

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

            <div className="grid gap-6">
              <LearningAreaCard
                icon="vocabulary"
                title="Vocabulary"
                description="Learn essential words and phrases for this module"
                progress={0}
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
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-charcoal">Module Progress</h3>

            <div className="mb-6 text-center">
              <div className="mb-2 inline-block h-24 w-24 rounded-full bg-terracotta/10 p-6">
                <div className="flex h-full items-center justify-center">
                  <span className="text-2xl font-bold text-terracotta">
                    {overallProgress > 0 ? `${overallProgress}%` : "•"}
                  </span>
                </div>
              </div>
              <div className="mb-1 text-4xl font-bold text-terracotta">{overallProgress}%</div>
              <div className="text-sm text-charcoal/60">Complete</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal/70">Vocabulary</span>
                <span className="font-medium text-charcoal">0%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sand-100">
                <div className="h-full w-0 rounded-full bg-terracotta transition-all" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal/70">Grammar</span>
                <span className="font-medium text-charcoal">{grammarProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sand-100">
                <div
                  className="h-full rounded-full bg-terracotta transition-all"
                  style={{ width: `${grammarProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal/70">Reading</span>
                <span className="font-medium text-charcoal">{readingProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sand-100">
                <div
                  className="h-full rounded-full bg-terracotta transition-all"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal/70">Writing</span>
                <span className="font-medium text-charcoal">{writingProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sand-100">
                <div
                  className="h-full rounded-full bg-terracotta transition-all"
                  style={{ width: `${writingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


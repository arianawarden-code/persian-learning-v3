"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { modules, moduleContent } from "@/lib/module-data"
import { useAuth } from "@/lib/auth-context"
import { useAllModulesProgress, useModuleProgress } from "@/hooks/use-module-progress"
import { getLastActivity } from "@/lib/progress-storage"
import type { LastActivity } from "@/lib/progress-storage"
import { ProfileDropdown } from "@/components/profile-dropdown"

function getActivityLabel(activity: LastActivity | null, moduleId: string, progress: { vocabulary: number; reading: number; writing: number; grammar: number }): string | null {
  const content = moduleContent[moduleId as keyof typeof moduleContent]
  if (!content) return null

  // Determine which area user was last in, or pick the first incomplete one
  const area = activity?.moduleId === moduleId
    ? activity.type
    : progress.vocabulary < 100 ? "vocabulary"
    : progress.grammar < 100 ? "grammar"
    : progress.reading < 100 ? "reading"
    : progress.writing < 100 ? "writing"
    : null

  if (!area) return null

  const vocabCount = content.vocabulary?.length || 0
  const readingCount = content.reading?.length || 0
  const writingCount = content.writing?.length || 0
  const grammarCount = content.grammar?.length || 0

  switch (area) {
    case "vocabulary": {
      const remaining = Math.round(vocabCount * (1 - progress.vocabulary / 100))
      return remaining > 0 ? `Up next: Vocabulary (${remaining} words)` : "Vocabulary"
    }
    case "reading": {
      const storiesLeft = Math.round(readingCount * (1 - progress.reading / 100))
      const mins = storiesLeft * 5
      return mins > 0 ? `Up next: Reading (~${mins} min)` : "Reading"
    }
    case "writing": {
      const exercisesLeft = Math.round(writingCount * (1 - progress.writing / 100))
      const mins = exercisesLeft * 8
      return mins > 0 ? `Up next: Writing (~${mins} min)` : "Writing"
    }
    case "grammar": {
      const exercisesLeft = Math.round(grammarCount * (1 - progress.grammar / 100))
      const mins = exercisesLeft * 6
      return mins > 0 ? `Up next: Grammar (~${mins} min)` : "Grammar"
    }
    default:
      return null
  }
}

export default function HomePage() {
  const { user } = useAuth()
  const [hasAccount, setHasAccount] = useState(false)
  const [lastActivity, setLastActivity] = useState<LastActivity | null>(null)
  const allProgress = useAllModulesProgress(modules)

  // Find the current module: first one not at 100%, or fall back to first module
  const currentModuleId =
    modules.find((m) => (allProgress[String(m.id)] ?? 0) < 100)?.id ?? modules[0].id
  const currentModule = modules.find((m) => String(m.id) === String(currentModuleId))!
  const currentProgress = useModuleProgress(String(currentModuleId))

  const isReturning = !!user && Object.values(allProgress).some((p) => p > 0)
  const activityLabel = getActivityLabel(lastActivity, String(currentModuleId), currentProgress)

  useEffect(() => {
    setHasAccount(localStorage.getItem("has-account") === "true")
    setLastActivity(getLastActivity())
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem("has-account", "true")
  }, [user])

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <ProfileDropdown />
            ) : (
              <Link href={hasAccount ? "/auth/login" : "/auth/signup"}>
                <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                  {hasAccount ? "Sign In" : "Sign Up"}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-2 text-center">
        <p className="mb-4 animate-salam-fade select-none text-8xl text-charcoal/[0.12]" style={{ fontFamily: "var(--font-persian)" }}>
          سلام
        </p>

        <div className="mx-auto max-w-md rounded-2xl border border-sand-200 bg-white px-8 py-7 shadow-lg">
          {isReturning ? (
            <>
              <p className="mb-1 text-base font-medium text-charcoal/65">Welcome back</p>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-terracotta/50">
                Module {currentModule.id}
              </p>
              <h1 className="text-[22px] font-bold leading-snug text-charcoal" style={{ fontFamily: "var(--font-inter)" }}>
                {currentModule.title}
              </h1>
              {activityLabel && (
                <p className="mt-1.5 text-base font-medium text-charcoal/55">
                  {activityLabel}
                </p>
              )}
              <div className="mt-5">
                <Link href={`/modules/${currentModule.id}`}>
                  <Button size="lg" className="w-full rounded-full text-lg shadow-md">
                    Continue Learning →
                  </Button>
                </Link>
                <Link href="/modules" className="mt-3 inline-block text-xs text-charcoal/40 hover:text-terracotta transition-colors">
                  View all modules →
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-2 font-serif text-2xl font-bold text-charcoal">
                Start learning Persian
              </h1>
              <p className="mb-5 text-sm text-charcoal/50">
                Begin with short, guided lessons designed for beginners.
              </p>
              <Link href={`/modules/${modules[0].id}`}>
                <Button size="lg" className="w-full rounded-full text-lg shadow-md">
                  Start Module 1 →
                </Button>
              </Link>
              <Link href="/modules" className="mt-3 inline-block text-xs text-charcoal/40 hover:text-terracotta transition-colors">
                View all modules →
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

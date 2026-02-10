"use client"

import { useState, useEffect } from "react"
import { modules } from "@/lib/module-data"
import Link from "next/link"
import { ModuleCard } from "@/components/module-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Flame, Zap, CheckCircle2 } from "lucide-react"
import { BookOpen } from "@/components/book-open"
import { useAllModulesProgress } from "@/hooks/use-module-progress"
import { getStreak, getReviewStats } from "@/lib/srs-storage"
import { ProfileDropdown } from "@/components/profile-dropdown"

export default function ModulesPage() {
  const progress = useAllModulesProgress(modules)
  const [streak, setStreak] = useState(0)
  const [reviewStats, setReviewStats] = useState<{ dueToday: number; totalCards: number } | null>(null)
  const [todayCompleted, setTodayCompleted] = useState(false)

  useEffect(() => {
    setStreak(getStreak())
    const stats = getReviewStats()
    setReviewStats(stats)

    // Check if today's review is done: has cards but none due
    if (stats.totalCards > 0 && stats.dueToday === 0) {
      // Check streak to confirm they actually reviewed today
      const streakVal = getStreak()
      const today = new Date().toISOString().slice(0, 10)
      const stored = localStorage.getItem("srs-review-streak")
      if (stored) {
        const data = JSON.parse(stored)
        setTodayCompleted(data.lastReviewDate === today)
      }
    }
  }, [])

  const alphabetModules = modules.filter((m) => m.level === "alphabet")
  const beginnerModules = modules.filter((m) => m.level === "beginner")
  const intermediateModules = modules.filter((m) => m.level === "intermediate")
  const advancedModules = modules.filter((m) => m.level === "advanced")

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5 text-charcoal" />
              </Button>
            </Link>
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
          <div className="flex items-center gap-3">
            {streak > 0 && (
              <div className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-700">{streak}</span>
                <span className="text-xs text-orange-600">day{streak === 1 ? "" : "s"}</span>
              </div>
            )}
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Daily Practice Box */}
        {reviewStats && reviewStats.totalCards > 0 && (
          <div className="mb-8 flex justify-end">
            <Link href="/review">
              {todayCompleted ? (
                <div className="group relative overflow-hidden rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 px-6 py-4 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-green-500 p-2.5 shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-green-800">Done for today!</div>
                      <div className="text-xs text-green-600">Great work — come back tomorrow</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="group relative overflow-hidden rounded-2xl border-2 border-terracotta/30 bg-gradient-to-br from-terracotta/5 to-orange-50 px-6 py-4 shadow-sm transition-all hover:shadow-md hover:border-terracotta/50">
                  <div className="absolute -right-3 -top-3 text-6xl opacity-10">⚡</div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-terracotta p-2.5 shadow-sm transition-transform group-hover:scale-110">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">Daily Practice</div>
                      <div className="text-xs text-charcoal/60">
                        <span className="font-semibold text-terracotta">{reviewStats.dueToday}</span> word{reviewStats.dueToday === 1 ? "" : "s"} to review
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </div>
        )}

        {/* Title Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full border border-terracotta/30 bg-terracotta/10 px-6 py-2">
            <div className="flex items-center gap-2 text-terracotta">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Learning Modules</span>
            </div>
          </div>

          <h1 className="mb-4 text-balance font-serif text-5xl font-bold text-charcoal">
            Your Path to <span className="text-terracotta italic">Persian Fluency</span>
          </h1>

          <p className="mx-auto max-w-3xl text-balance text-lg leading-relaxed text-charcoal/70">
            Progress through 15 comprehensive modules designed to take you from complete beginner to advanced fluency
          </p>
        </div>

        {/* Alphabet Level */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-blue-600" />
            <h2 className="text-3xl font-bold text-charcoal">Alphabet</h2>
          </div>

          <p className="mb-6 text-charcoal/70">
            Master the Persian alphabet with 5 progressive modules. Learn letters, pronunciation, diacritics, and build
            your first words.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alphabetModules.map((module) => (
              <ModuleCard key={module.id} module={module} progress={progress[String(module.id)] || 0} />
            ))}
          </div>
        </section>

        {/* Beginner Level */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-terracotta" />
            <h2 className="text-3xl font-bold text-charcoal">Beginner</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {beginnerModules.map((module) => (
              <ModuleCard key={module.id} module={module} progress={progress[String(module.id)] || 0} />
            ))}
          </div>
        </section>

        {/* Intermediate Level */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-amber-600" />
            <h2 className="text-3xl font-bold text-charcoal">Intermediate</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {intermediateModules.map((module) => (
              <ModuleCard key={module.id} module={module} progress={progress[String(module.id)] || 0} />
            ))}
          </div>
        </section>

        {/* Advanced Level */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-purple-600" />
            <h2 className="text-3xl font-bold text-charcoal">Advanced</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {advancedModules.map((module) => (
              <ModuleCard key={module.id} module={module} progress={progress[String(module.id)] || 0} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

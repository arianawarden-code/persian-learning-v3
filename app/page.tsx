"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLastActivity } from "@/lib/progress-storage"
import type { LastActivity } from "@/lib/progress-storage"
import { modules } from "@/lib/module-data"

function getResumeUrl(activity: LastActivity): string {
  switch (activity.type) {
    case "reading":
      return `/modules/${activity.moduleId}/reading/${activity.id}`
    case "writing":
      return `/modules/${activity.moduleId}/writing`
    case "grammar":
      return `/modules/${activity.moduleId}/grammar`
  }
}

function getActivityLabel(activity: LastActivity): string {
  switch (activity.type) {
    case "reading":
      return "Reading"
    case "writing":
      return "Writing"
    case "grammar":
      return "Grammar"
  }
}

export default function HomePage() {
  const [lastActivity, setLastActivity] = useState<LastActivity | null>(null)

  useEffect(() => {
    setLastActivity(getLastActivity())
  }, [])

  const moduleTitle = lastActivity
    ? modules.find((m) => String(m.id) === String(lastActivity.moduleId))?.title ?? `Module ${lastActivity.moduleId}`
    : null

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
          <Link href="/modules">
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8 inline-block">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-serif text-4xl text-terracotta">سلام</span>
            <span className="text-2xl">⭐</span>
          </div>
        </div>

        <h1 className="mb-6 text-balance font-serif text-6xl font-bold leading-tight text-charcoal">
          Master Persian <span className="text-terracotta italic">from Beginner to Fluent</span>
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-balance text-xl leading-relaxed text-charcoal/70">
          Learn to speak, read, and write Persian through comprehensive lessons, interactive exercises, and real-world
          practice. Your journey to fluency starts here.
        </p>

        {/* Resume Button */}
        {lastActivity && moduleTitle && (
          <div className="mx-auto mb-8 max-w-md">
            <Link href={getResumeUrl(lastActivity)}>
              <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-md transition-all hover:shadow-lg hover:border-terracotta/40">
                <div className="flex items-center justify-center gap-3">
                  <div className="rounded-xl bg-terracotta/10 p-3">
                    <RotateCcw className="h-6 w-6 text-terracotta" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-charcoal/60">Continue where you left off</p>
                    <p className="font-semibold text-charcoal">{moduleTitle} &middot; {getActivityLabel(lastActivity)}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-sand-200 bg-white p-12 shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-terracotta p-6 shadow-md">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-terracotta">Explore Learning Modules</h2>

          <p className="mb-8 text-lg leading-relaxed text-charcoal/70">
            Start your journey with structured modules designed to take you from beginner to advanced fluency
          </p>

          <Link href="/modules">
            <Button size="lg" className="rounded-full px-12 py-6 text-lg shadow-lg">
              View All Modules →
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-sand-200 bg-white/50 p-8">
          <h3 className="mb-8 text-center text-2xl font-semibold text-charcoal">
            Progress through 15 comprehensive modules organized by difficulty level. Each module covers vocabulary,
            grammar, reading, writing, pronunciation, and conversation practice.
          </h3>
        </div>
      </section>
    </div>
  )
}

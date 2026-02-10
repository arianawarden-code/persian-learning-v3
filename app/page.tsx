"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLastActivity } from "@/lib/progress-storage"
import type { LastActivity } from "@/lib/progress-storage"
import { modules } from "@/lib/module-data"
import { getReviewStats } from "@/lib/srs-storage"
import { useAuth } from "@/lib/auth-context"
import { ProfileDropdown } from "@/components/profile-dropdown"

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

export default function HomePage() {
  const { user, loading } = useAuth()
  const [lastActivity, setLastActivity] = useState<LastActivity | null>(null)
  const [reviewStats, setReviewStats] = useState<{ dueToday: number; totalCards: number } | null>(null)
  const [hasAccount, setHasAccount] = useState(false)

  useEffect(() => {
    setLastActivity(getLastActivity())
    setReviewStats(getReviewStats())
    setHasAccount(localStorage.getItem("has-account") === "true")
  }, [])

  // Set the flag when user is logged in
  useEffect(() => {
    if (user) localStorage.setItem("has-account", "true")
  }, [user])

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
          <div className="flex items-center gap-3">
            <Link href="/modules">
              <Button size="lg" className="rounded-full">
                Get Started
              </Button>
            </Link>
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

        {/* Daily Review Card */}
        {reviewStats && reviewStats.dueToday > 0 && (
          <div className="mx-auto mb-8 max-w-4xl rounded-3xl border border-terracotta/30 bg-terracotta/5 p-8 shadow-md">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-terracotta p-3 shadow-sm">
                  <RotateCcw className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-charcoal">Daily Review</h3>
                  <p className="text-charcoal/70">
                    <span className="font-semibold text-terracotta">{reviewStats.dueToday}</span>{" "}
                    word{reviewStats.dueToday === 1 ? "" : "s"} ready for review
                  </p>
                </div>
              </div>
              <Link href="/review">
                <Button size="lg" className="rounded-full px-8 shadow-md">
                  Start Review →
                </Button>
              </Link>
            </div>
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

          <div className="flex items-center justify-center gap-4">
            <Link href="/modules">
              <Button size="lg" className="rounded-full px-12 py-6 text-lg shadow-lg">
                View All Modules →
              </Button>
            </Link>
            {lastActivity && moduleTitle && (
              <Link href={getResumeUrl(lastActivity)}>
                <Button size="lg" variant="outline" className="rounded-full px-12 py-6 text-lg shadow-lg bg-transparent">
                  Resume Learning →
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

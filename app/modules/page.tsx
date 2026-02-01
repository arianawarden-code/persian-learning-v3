"use client"

import { modules } from "@/lib/module-data"
import { ModuleCard } from "@/components/module-card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { BookOpen } from "@/components/book-open"
import { useAllModulesProgress } from "@/hooks/use-module-progress"

export default function ModulesPage() {
  const progress = useAllModulesProgress(modules)

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
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Trophy className="h-5 w-5 text-terracotta" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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

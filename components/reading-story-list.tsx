"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle, CircleDashed } from "lucide-react"
import type { ReadingExercise } from "@/lib/module-data"
import { getStoryStatus } from "@/lib/progress-storage"

type StoryStatus = "attempted" | "mastered" | null

function StatusIcon({ status }: { status: StoryStatus }) {
  if (status === "mastered") return <CheckCircle2 className="h-5 w-5" />
  if (status === "attempted") return <CircleDashed className="h-5 w-5" />
  return <Circle className="h-5 w-5" />
}

function statusLabel(status: StoryStatus) {
  if (status === "mastered") return "Completed"
  if (status === "attempted") return "In progress"
  return "Not started"
}

export function ReadingStoryList({
  moduleId,
  moduleTitle,
  stories,
}: {
  moduleId: string | number
  moduleTitle: string
  stories: ReadingExercise[]
}) {
  // hydration guard so localStorage-backed status doesn’t mismatch SSR
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const statuses = useMemo(() => {
    if (!hydrated) return stories.map(() => null as StoryStatus)
    return stories.map((s) => getStoryStatus(moduleId, s.id))
  }, [hydrated, moduleId, stories])

  const masteredCount = useMemo(
    () => statuses.filter((s) => s === "mastered").length,
    [statuses],
  )

  const attemptedCount = useMemo(
    () => statuses.filter((s) => s === "attempted").length,
    [statuses],
  )

  const percentMastered =
    stories.length === 0 ? 0 : Math.round((masteredCount / stories.length) * 100)

  return (
    <div className="space-y-6">
      {/* Header + Progress */}
      {/* Progress only (page already shows the title) */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <div className="text-sm text-charcoal/70">
            {masteredCount}/{stories.length} mastered
            {attemptedCount > 0 && (
              <span className="ml-2">• {attemptedCount} in progress</span>
            )}
          </div>
      
          <div className="text-sm text-charcoal/70">
            {percentMastered}%
          </div>
        </div>
      
        <Progress value={percentMastered} className="h-2" />
      
        <div className="text-xs text-charcoal/60">
          {percentMastered === 100 ? "Completed ✓" : "Keep going — master them all for full completion."}
        </div>
      </div>


      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {stories.map((story, idx) => {
          const status = statuses[idx]

          return (
            <Link
              key={String(story.id)}
              href={`/modules/${moduleId}/reading/${story.id}`}
              className="block"
            >
              <Card
                className={cn(
                  "relative overflow-hidden border-sand-200 bg-white p-6 transition hover:shadow-sm",
                  status === "mastered" && "opacity-95",
                )}
              >
                {/* number pill */}
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-terracotta/60 bg-white text-base font-semibold text-terracotta/85">
                  {idx + 1}
                </div>

                {/* status icon */}
                <div
                  className={cn(
                    "absolute right-4 top-4",
                    status === "mastered" && "text-green-600",
                    status === "attempted" && "text-amber-600",
                    status === null && "text-charcoal/35",
                  )}
                  aria-label={statusLabel(status)}
                  title={statusLabel(status)}
                >
                  <StatusIcon status={status} />
                </div>

                <div className="pt-10">
                  <div className="font-medium text-charcoal">{story.title}</div>

                  <div className="mt-2 text-sm text-charcoal/60">
                    {statusLabel(status)}
                  </div>

                  <div className="mt-3 text-sm font-medium text-terracotta">
                    Read Story →
                  </div>
                </div>

                {/* optional: tiny bottom accent for mastered */}
                {status === "mastered" && (
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-green-500/30" />
                )}
                {status === "attempted" && (
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-amber-500/25" />
                )}
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


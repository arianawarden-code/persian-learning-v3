"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { BookOpen, Check, Clock } from "lucide-react"
import type { Lesson } from "@/lib/lesson-data"

interface LessonCardProps {
  lesson: Lesson
  isComplete: boolean
  isLocked: boolean
}

export function LessonCard({ lesson, isComplete, isLocked }: LessonCardProps) {
  const content = (
    <Card
      className={`group flex h-full cursor-pointer flex-col border-sand-200 bg-white px-8 pt-8 pb-8 transition-all ${
        isLocked ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={`rounded-2xl p-4 ${isComplete ? "bg-green-100" : "bg-terracotta/10"}`}>
          {isComplete ? (
            <Check className="h-8 w-8 text-green-700" />
          ) : (
            <BookOpen className="h-8 w-8 text-terracotta" />
          )}
        </div>
        <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-charcoal/60">
          Lesson {lesson.number}
        </span>
      </div>

      <h3 className="text-xl font-bold text-charcoal group-hover:text-terracotta leading-tight mb-1">
        {lesson.title}
      </h3>

      <p className="text-sm text-charcoal/60 mb-3">{lesson.goal}</p>

      <div className="mt-auto flex items-center gap-1.5 text-xs text-charcoal/50">
        <Clock className="h-3.5 w-3.5" />
        <span>{lesson.timeEstimate}</span>
      </div>
    </Card>
  )

  if (isLocked) {
    return <div className="h-full">{content}</div>
  }

  return (
    <Link href={`/modules/1/lessons/${lesson.id}`} className="h-full">
      {content}
    </Link>
  )
}

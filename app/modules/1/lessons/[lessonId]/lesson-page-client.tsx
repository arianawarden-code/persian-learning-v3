"use client"

import { LessonFlow } from "@/components/lesson-flow"
import type { Lesson } from "@/lib/lesson-data"
import type { VocabularyWord, ReadingExercise } from "@/lib/module-data"

interface LessonPageClientProps {
  lesson: Lesson
  vocabWords: VocabularyWord[]
  readingStory: ReadingExercise
  moduleId: string
}

export default function LessonPageClient({
  lesson,
  vocabWords,
  readingStory,
  moduleId,
}: LessonPageClientProps) {
  return (
    <LessonFlow
      lesson={lesson}
      vocabWords={vocabWords}
      readingStory={readingStory}
      moduleId={moduleId}
    />
  )
}

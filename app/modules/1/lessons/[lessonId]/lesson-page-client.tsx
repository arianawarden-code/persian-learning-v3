"use client"

import { LessonFlow } from "@/components/lesson-flow"
import type { Lesson } from "@/lib/lesson-data"
import type { VocabularyWord, ReadingExercise, GrammarExercise, WritingExercise } from "@/lib/module-data"

interface LessonPageClientProps {
  lesson: Lesson
  vocabWords: VocabularyWord[]
  grammarExercise: GrammarExercise
  readingStories: ReadingExercise[]
  writingExercises: WritingExercise[]
  moduleId: string
}

export default function LessonPageClient({
  lesson,
  vocabWords,
  grammarExercise,
  readingStories,
  writingExercises,
  moduleId,
}: LessonPageClientProps) {
  return (
    <LessonFlow
      lesson={lesson}
      vocabWords={vocabWords}
      grammarExercise={grammarExercise}
      readingStories={readingStories}
      writingExercises={writingExercises}
      moduleId={moduleId}
    />
  )
}

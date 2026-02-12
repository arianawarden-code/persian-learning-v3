"use client"

import { LessonFlow } from "@/components/lesson-flow"
import type { Lesson } from "@/lib/lesson-data"
import type { VocabularyWord, ReadingExercise, GrammarExercise, WritingExercise } from "@/lib/module-data"

interface LessonPageClientProps {
  lesson: Lesson
  vocabWords: VocabularyWord[]
  grammarExercise: GrammarExercise
  readingStory: ReadingExercise
  writingExercises: WritingExercise[]
  moduleId: string
}

export default function LessonPageClient({
  lesson,
  vocabWords,
  grammarExercise,
  readingStory,
  writingExercises,
  moduleId,
}: LessonPageClientProps) {
  return (
    <LessonFlow
      lesson={lesson}
      vocabWords={vocabWords}
      grammarExercise={grammarExercise}
      readingStory={readingStory}
      writingExercises={writingExercises}
      moduleId={moduleId}
    />
  )
}

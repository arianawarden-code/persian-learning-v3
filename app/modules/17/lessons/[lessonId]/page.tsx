import { notFound } from "next/navigation"
import { getLessonById } from "@/lib/lesson-data"
import { moduleContent } from "@/lib/module-data"
import LessonPageClient from "../../../1/lessons/[lessonId]/lesson-page-client"

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = await params
  const lesson = getLessonById(lessonId, "17")

  if (!lesson) {
    notFound()
  }

  const content = moduleContent[17]
  const vocabWords = content.vocabulary.slice(
    lesson.phases.vocabIndices[0],
    lesson.phases.vocabIndices[1]
  )
  const grammarExercise = content.grammar?.[lesson.phases.grammarIndex]
  const readingStories = content.reading.filter(
    (s) => lesson.phases.readingStoryIds.includes(s.id)
  )
  const writingExercises = content.writing.slice(
    lesson.phases.writingIndices[0],
    lesson.phases.writingIndices[1]
  )

  if (readingStories.length === 0 || !grammarExercise) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <LessonPageClient
          lesson={lesson}
          vocabWords={vocabWords}
          grammarExercise={grammarExercise}
          readingStories={readingStories}
          writingExercises={writingExercises}
          moduleId="17"
        />
      </div>
    </div>
  )
}

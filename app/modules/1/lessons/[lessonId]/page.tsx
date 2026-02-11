import { notFound } from "next/navigation"
import { getLessonById } from "@/lib/lesson-data"
import { moduleContent } from "@/lib/module-data"
import LessonPageClient from "./lesson-page-client"

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = await params
  const lesson = getLessonById(lessonId)

  if (!lesson) {
    notFound()
  }

  const content = moduleContent[1]
  const vocabWords = content.vocabulary.slice(
    lesson.phases.vocabIndices[0],
    lesson.phases.vocabIndices[1]
  )
  const readingStory = content.reading.find(
    (s) => s.id === lesson.phases.readingStoryId
  )

  if (!readingStory) {
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
          readingStory={readingStory}
          moduleId="1"
        />
      </div>
    </div>
  )
}

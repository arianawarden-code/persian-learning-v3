import Link from "next/link"
import { modules, moduleContent } from "@/lib/module-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { WordBuilder } from "@/components/word-builder"

function WritingLoading() {
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
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-32 rounded bg-sand-200"></div>
          <div className="h-12 w-96 rounded bg-sand-200"></div>
        </div>
      </div>
    </div>
  )
}

async function WritingContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const module = modules.find((m) => String(m.id) === id)
  const content = moduleContent[id]

  if (!module) {
    notFound()
  }

  const totalExercises = content?.writing?.length || 0

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
          <Button className="rounded-full">Practice Now</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/modules/${id}`}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Title */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-charcoal/60">Module {module.id}</p>
          <h1 className="mb-2 text-4xl font-bold text-charcoal">{module.title} - Writing</h1>
          <p className="text-charcoal/70">Develop writing skills through guided exercises</p>
        </div>

        {/* Writing Exercises */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-charcoal">
            Writing Exercises ({content?.writing?.length || 0} exercises)
          </h2>

          <div className="space-y-6">
            {content?.writing ? (
              content.writing.map((exercise, index) => (
                <Card key={exercise.id} className="border-sand-200 bg-white p-6">
                  {exercise.type === "build-word" ? (
                    <WordBuilder
                      targetWord={exercise.targetWord}
                      targetWordTransliteration={exercise.targetWordTransliteration}
                      availableLetters={exercise.availableLetters || []}
                      instruction={exercise.instruction}
                      moduleId={id}
                      exerciseId={exercise.id}
                      totalExercises={totalExercises}
                      currentExerciseIndex={index}
                    />
                  ) : (
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          {exercise.type === "sentence" ? "Write Sentence" : "Write Paragraph"}
                        </span>
                      </div>
                      <h3 className="mb-4 text-lg font-semibold text-charcoal">{exercise.instruction}</h3>
                      <p className="mb-4 text-charcoal/70">{exercise.prompt}</p>
                      <textarea
                        className="min-h-32 w-full rounded-lg border-2 border-sand-200 bg-white p-4 font-serif text-lg text-charcoal transition-colors focus:border-terracotta focus:outline-none"
                        placeholder="Write your answer here..."
                        dir="rtl"
                      />
                      <div className="mt-6 flex justify-end gap-3">
                        <Button variant="outline">Reset</Button>
                        <Button className="bg-terracotta hover:bg-terracotta/90">Submit</Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <p className="text-charcoal/60">No writing exercises available for this module yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function WritingPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<WritingLoading />}>
      <WritingContent params={params} />
    </Suspense>
  )
}

import Link from "next/link"
import { modules, moduleContent } from "@/lib/module-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { VocabularyFlashcards } from "@/components/vocabulary-flashcards"

function VocabularyLoading() {
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

async function VocabularyContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const module = modules.find((m) => String(m.id) === id)
  const content = moduleContent[id]

  if (!module) {
    notFound()
  }

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
          <h1 className="mb-2 text-4xl font-bold text-charcoal">{module.title} - Vocabulary</h1>
        </div>

        {/* Interactive Practice + Word List */}
        {content?.vocabulary && content.vocabulary.length > 0 ? (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-charcoal">Interactive Practice</h2>
            <VocabularyFlashcards vocabulary={content.vocabulary} moduleId={id} showWordList />
          </section>
        ) : (
          <p className="text-charcoal/60">No vocabulary words available for this module yet.</p>
        )}
      </div>
    </div>
  )
}

export default function VocabularyPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<VocabularyLoading />}>
      <VocabularyContent params={params} />
    </Suspense>
  )
}


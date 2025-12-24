import Link from "next/link"
import { modules, moduleContent } from "@/lib/module-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

        {/* Interactive Practice */}
        {content?.vocabulary && content.vocabulary.length > 0 ? (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-charcoal">Interactive Practice</h2>
            <VocabularyFlashcards vocabulary={content.vocabulary} moduleId={id} />
          </section>
        ) : (
          <p className="text-charcoal/60">No vocabulary words available for this module yet.</p>
        )}

        {/* Vocabulary Words */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-charcoal">
            All Vocabulary Words ({content?.vocabulary?.length || 0} words)
          </h2>

          <div className="space-y-4">
            {content?.vocabulary ? (
              content.vocabulary.map((word, index) => (
                <VocabularyItem
                  key={index}
                  persian={word.persian}
                  transliteration={word.transliteration}
                  english={word.english}
                  example={word.example}
                  exampleTranslation={word.exampleTranslation}
                />
              ))
            ) : (
              <p className="text-charcoal/60">No vocabulary words available for this module yet.</p>
            )}
          </div>
        </section>
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

function VocabularyItem({
  persian,
  transliteration,
  english,
  example,
  exampleTranslation,
}: {
  persian: string
  transliteration: string
  english: string
  example: string
  exampleTranslation: string
}) {
  return (
    <Card className="border-sand-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-4">
        <span className="font-serif text-3xl font-bold text-terracotta">{persian}</span>
        <span className="text-xl text-charcoal/60">{transliteration}</span>
        <span className="text-xl font-semibold text-charcoal">{english}</span>
      </div>

      <div className="rounded-lg bg-sand-50 p-4">
        <p className="mb-1 font-medium text-charcoal/60">Example:</p>
        <p className="mb-2 font-serif text-lg text-charcoal" dir="rtl">
          {example}
        </p>
        <p className="italic text-charcoal/70">{exampleTranslation}</p>
      </div>
    </Card>
  )
}

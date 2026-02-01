import Link from "next/link"
import { modules, moduleContent } from "@/lib/module-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ReadingStoryList } from "@/components/ui/reading-story-list"


function ReadingLoading() {
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

async function ReadingContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const module = modules.find((m) => String(m.id) === id)
  const content = moduleContent[id as keyof typeof moduleContent]

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
            Back to Module
          </Button>
        </Link>

        {/* Title */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-charcoal/60">Module {module.id}</p>
          <h1 className="mb-2 text-balance text-4xl font-bold text-charcoal">{module.title} - Reading</h1>
          <p className="text-charcoal/70">Choose a story to practice reading comprehension</p>
        </div>

        {/* Reading Stories */}
        {content?.reading?.length ? (
          <ReadingStoryList
            moduleId={id}
            moduleTitle={module.title}
            stories={content.reading}
          />
        ) : (
          <p className="text-charcoal/60">No reading exercises available for this module yet.</p>
        )}
      </div>
    </div>
  )
}

export default function ReadingPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<ReadingLoading />}>
      <ReadingContent params={params} />
    </Suspense>
  )
}

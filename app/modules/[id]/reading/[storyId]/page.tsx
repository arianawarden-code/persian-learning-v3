import Link from "next/link"
import { modules, moduleContent } from "@/lib/module-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ReadingStory } from "@/components/reading-story"

export function generateStaticParams() {
  const params: { id: string; storyId: string }[] = []

  Object.keys(moduleContent).forEach((moduleId) => {
    const content = moduleContent[moduleId]
    if (content?.reading) {
      content.reading.forEach((story) => {
        params.push({
          id: moduleId,
          storyId: story.id.toString(),
        })
      })
    }
  })

  return params
}

function StoryLoading() {
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

async function StoryContent({
  params,
}: {
  params: Promise<{ id: string; storyId: string }>
}) {
  const { id, storyId } = await params
  const module = modules.find((m) => String(m.id) === id)
  const content = moduleContent[id]
  const story = content?.reading?.find((s) => s.id === Number.parseInt(storyId))

  if (!module || !story) {
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

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link href={`/modules/${id}/reading`}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Stories
          </Button>
        </Link>

        <div className="mb-6">
          <p className="mb-2 text-sm text-charcoal/60">Module {module.id} - Reading</p>
          <h1 className="text-3xl font-bold text-charcoal">{story.title}</h1>
        </div>

        <ReadingStory story={story} moduleId={id} />
      </div>
    </div>
  )
}

export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string; storyId: string }>
}) {
  return (
    <Suspense fallback={<StoryLoading />}>
      <StoryContent params={params} />
    </Suspense>
  )
}

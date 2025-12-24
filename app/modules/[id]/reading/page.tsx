import Link from "next/link"
import { modules, moduleContent } from "@/lib/module-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"

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
        <section>
          <h2 className="mb-6 text-2xl font-bold text-charcoal">
            Reading Stories ({content?.reading?.length || 0} available)
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content?.reading ? (
              content.reading.map((exercise, index) => (
                <Link key={exercise.id} href={`/modules/${id}/reading/${exercise.id}`}>
                  <Card className="group relative cursor-pointer border-sand-200 bg-white p-6 transition-all hover:shadow-lg hover:border-terracotta/30">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
                        <span className="text-2xl font-bold text-amber-700">{index + 1}</span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center opacity-0 group-data-[completed]:opacity-100 transition-opacity">
                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="mb-3 text-lg font-medium text-charcoal/80">{exercise.title}</p>
                    <p className="text-sm text-charcoal/60 line-clamp-2">{exercise.textTranslation}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-terracotta">
                      <span>Read Story</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-charcoal/60">No reading exercises available for this module yet.</p>
            )}
          </div>
        </section>
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

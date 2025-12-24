import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { modules, moduleContent } from "@/lib/module-data"
import GrammarExercises from "@/components/grammar-exercises"
import { Button } from "@/components/ui/button"

async function GrammarContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const module = modules.find((m) => String(m.id) === id)

  if (!module) {
    notFound()
  }

  const content = moduleContent[id]

  if (!content || !content.grammar || content.grammar.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href={`/modules/${id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Module
              </Button>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Grammar Section Coming Soon</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Grammar exercises for this module are currently being developed. Please check back later!
              </p>
              <p className="text-sm text-muted-foreground">
                In the meantime, you can explore other sections of this module.
              </p>
            </div>
            <Link href={`/modules/${id}`}>
              <Button size="lg">Return to Module</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GrammarExercises moduleId={id} module={module} exercises={content.grammar} />
    </div>
  )
}

function GrammarLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-8 bg-muted rounded w-1/2 mb-4" />
        <div className="h-32 bg-muted rounded mb-4" />
        <div className="h-32 bg-muted rounded" />
      </div>
    </div>
  )
}

export default function GrammarPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<GrammarLoading />}>
      <GrammarContent params={params} />
    </Suspense>
  )
}

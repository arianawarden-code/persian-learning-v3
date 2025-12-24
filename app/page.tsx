import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
          <Link href="/modules">
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8 inline-block">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-serif text-4xl text-terracotta">سلام</span>
            <span className="text-2xl">⭐</span>
          </div>
        </div>

        <h1 className="mb-6 text-balance font-serif text-6xl font-bold leading-tight text-charcoal">
          Master Persian <span className="text-terracotta italic">from Beginner to Fluent</span>
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-balance text-xl leading-relaxed text-charcoal/70">
          Learn to speak, read, and write Persian through comprehensive lessons, interactive exercises, and real-world
          practice. Your journey to fluency starts here.
        </p>

        {/* CTA Section */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-sand-200 bg-white p-12 shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-terracotta p-6 shadow-md">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-terracotta">Explore Learning Modules</h2>

          <p className="mb-8 text-lg leading-relaxed text-charcoal/70">
            Start your journey with structured modules designed to take you from beginner to advanced fluency
          </p>

          <Link href="/modules">
            <Button size="lg" className="rounded-full px-12 py-6 text-lg shadow-lg">
              View All Modules →
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-sand-200 bg-white/50 p-8">
          <h3 className="mb-8 text-center text-2xl font-semibold text-charcoal">
            Progress through 15 comprehensive modules organized by difficulty level. Each module covers vocabulary,
            grammar, reading, writing, pronunciation, and conversation practice.
          </h3>
        </div>
      </section>
    </div>
  )
}

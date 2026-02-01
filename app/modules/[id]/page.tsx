import { Suspense } from "react"

import ModuleContentClient from "./module-content-client"

function ModuleLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 h-10 w-40 animate-pulse rounded bg-sand-100" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-32 animate-pulse rounded bg-sand-100" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-sand-100" />
          <div className="h-20 w-full animate-pulse rounded bg-sand-100" />
        </div>
        <div className="lg:col-span-1">
          <div className="h-64 w-full animate-pulse rounded-2xl bg-sand-100" />
        </div>
      </div>
    </div>
  )
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta">فارسی</span>
            <span className="text-xl font-semibold text-charcoal">Persian Learning</span>
          </div>
        </div>
      </header>

      <Suspense fallback={<ModuleLoading />}>
        <ModuleContentClient id={id} />
      </Suspense>
    </div>
  )
}

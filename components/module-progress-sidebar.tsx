interface ModuleProgressSidebarProps {
  vocabularyProgress: number
  grammarProgress: number
  readingProgress: number
  writingProgress: number
  overallProgress: number
}

export function ModuleProgressSidebar({
  vocabularyProgress,
  grammarProgress,
  readingProgress,
  writingProgress,
  overallProgress,
}: ModuleProgressSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-charcoal">Module Progress</h3>

        <div className="mb-6 text-center">
          <div className="mb-2 inline-block h-24 w-24 rounded-full bg-terracotta/10 p-6">
            <div className="flex h-full items-center justify-center">
              <span className="text-2xl font-bold text-terracotta">
                {overallProgress > 0 ? `${overallProgress}%` : "•"}
              </span>
            </div>
          </div>
          <div className="mb-1 text-4xl font-bold text-terracotta">{overallProgress}%</div>
          <div className="text-sm text-charcoal/60">Complete</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/70">Vocabulary</span>
            <span className="font-medium text-charcoal">{vocabularyProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full rounded-full bg-terracotta transition-all"
              style={{ width: `${vocabularyProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/70">Grammar</span>
            <span className="font-medium text-charcoal">{grammarProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full rounded-full bg-terracotta transition-all"
              style={{ width: `${grammarProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/70">Reading</span>
            <span className="font-medium text-charcoal">{readingProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full rounded-full bg-terracotta transition-all"
              style={{ width: `${readingProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/70">Writing</span>
            <span className="font-medium text-charcoal">{writingProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full rounded-full bg-terracotta transition-all"
              style={{ width: `${writingProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

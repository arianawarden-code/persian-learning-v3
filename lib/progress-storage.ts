// =========================
// Reading progress (attempted vs mastered)
// =========================

export type CompletionStatus = "attempted" | "mastered"

export interface ReadingProgress {
  [moduleId: string]: {
    [storyId: string]: CompletionStatus | boolean // boolean for backward-compat
  }
}

export function getReadingProgress(): ReadingProgress {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem("reading-progress")
  return stored ? JSON.parse(stored) : {}
}

function setReadingStatus(
  moduleId: string | number,
  storyId: string,
  status: CompletionStatus,
): void {
  if (typeof window === "undefined") return
  const progress = getReadingProgress()
  const moduleKey = String(moduleId)
  if (!progress[moduleKey]) progress[moduleKey] = {}

  const existing = progress[moduleKey][storyId]

  // Never downgrade mastered -> attempted
  if (existing === "mastered" || existing === true) {
    localStorage.setItem("reading-progress", JSON.stringify(progress))
    return
  }

  progress[moduleKey][storyId] = status
  localStorage.setItem("reading-progress", JSON.stringify(progress))
}

/** Give credit for finishing the story (even if not perfect). */
export function markStoryAttempted(moduleId: string | number, storyId: string): void {
  setReadingStatus(moduleId, storyId, "attempted")
}

/** Mark story as mastered (e.g., 100% correct). */
export function markStoryMastered(moduleId: string | number, storyId: string): void {
  setReadingStatus(moduleId, storyId, "mastered")
}

export function getStoryStatus(moduleId: string | number, storyId: string): CompletionStatus | null {
  const progress = getReadingProgress()
  const moduleKey = String(moduleId)
  const raw = progress[moduleKey]?.[storyId]

  // Backward compatibility if you previously stored boolean:
  if (raw === true) return "mastered"
  if (raw === false) return null

  return (raw as CompletionStatus) ?? null
}

export function isStoryAttempted(moduleId: string | number, storyId: string): boolean {
  const status = getStoryStatus(moduleId, storyId)
  return status === "attempted" || status === "mastered"
}

export function isStoryMastered(moduleId: string | number, storyId: string): boolean {
  return getStoryStatus(moduleId, storyId) === "mastered"
}

/** Summary for progress bars / roadmap. */
export function getReadingSummary(
  moduleId: string | number,
  storyIds: string[],
): {
  attempted: number
  mastered: number
  total: number
  attemptedPercent: number
  masteredPercent: number
  nextStoryId: string | null
} {
  const progress = getReadingProgress()
  const moduleKey = String(moduleId)
  const moduleProgress = progress[moduleKey] || {}

  const total = storyIds.length
  const attempted = storyIds.filter((id) => moduleProgress[id] === "attempted" || moduleProgress[id] === "mastered" || moduleProgress[id] === true).length
  const mastered = storyIds.filter((id) => moduleProgress[id] === "mastered" || moduleProgress[id] === true).length

  const attemptedPercent = total > 0 ? Math.round((attempted / total) * 100) : 0
  const masteredPercent = total > 0 ? Math.round((mastered / total) * 100) : 0

  const nextStoryId = storyIds.find((id) => !moduleProgress[id]) ?? null

  return { attempted, mastered, total, attemptedPercent, masteredPercent, nextStoryId }
}

// Writing progress tracking functions
export interface WritingProgress {
  [moduleId: string]: {
    [exerciseId: string]: boolean
  }
}

export function getWritingProgress(): WritingProgress {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem("writing-progress")
  return stored ? JSON.parse(stored) : {}
}

export function setWritingExerciseComplete(moduleId: string | number, exerciseId: string): void {
  if (typeof window === "undefined") return
  const progress = getWritingProgress()
  const moduleKey = String(moduleId)
  if (!progress[moduleKey]) {
    progress[moduleKey] = {}
  }
  progress[moduleKey][exerciseId] = true
  localStorage.setItem("writing-progress", JSON.stringify(progress))
}

export function isWritingExerciseComplete(moduleId: string | number, exerciseId: string): boolean {
  const progress = getWritingProgress()
  const moduleKey = String(moduleId)
  return progress[moduleKey]?.[exerciseId] || false
}

export function getModuleWritingProgress(moduleId: string | number, totalExercises: number): number {
  const progress = getWritingProgress()
  const moduleKey = String(moduleId)
  const moduleProgress = progress[moduleKey] || {}
  const completedCount = Object.values(moduleProgress).filter(Boolean).length
  return totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0
}

// Grammar progress tracking functions
export interface GrammarProgress {
  [moduleId: string]: {
    completedExercises: number[]
  }
}

export function getGrammarProgress(moduleId: string | number): { completedExercises: number[] } {
  if (typeof window === "undefined") return { completedExercises: [] }
  const stored = localStorage.getItem("grammar-progress")
  const allProgress: GrammarProgress = stored ? JSON.parse(stored) : {}
  const moduleKey = String(moduleId)
  return allProgress[moduleKey] || { completedExercises: [] }
}

export function markGrammarExerciseComplete(moduleId: string | number, exerciseId: number): void {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem("grammar-progress")
  const allProgress: GrammarProgress = stored ? JSON.parse(stored) : {}
  const moduleKey = String(moduleId)

  if (!allProgress[moduleKey]) {
    allProgress[moduleKey] = { completedExercises: [] }
  }

  if (!allProgress[moduleKey].completedExercises.includes(exerciseId)) {
    allProgress[moduleKey].completedExercises.push(exerciseId)
  }

  localStorage.setItem("grammar-progress", JSON.stringify(allProgress))
}

export function getModuleGrammarProgress(moduleId: string | number, totalExercises: number): number {
  const progress = getGrammarProgress(moduleId)
  const completedCount = progress.completedExercises.length
  return totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0
}

// =========================
// Last activity (Resume CTA)
// =========================

export type LastActivity =
  | { type: "reading"; moduleId: string; id: string }
  | { type: "writing"; moduleId: string; id: string }
  | { type: "grammar"; moduleId: string; id: number }

export function setLastActivity(activity: LastActivity) {
  if (typeof window === "undefined") return
  localStorage.setItem("last-activity", JSON.stringify(activity))
}

export function getLastActivity(): LastActivity | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("last-activity")
  return stored ? JSON.parse(stored) : null
}


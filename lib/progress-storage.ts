// Client-side progress tracking utilities
export interface ReadingProgress {
  [moduleId: string]: {
    [storyId: string]: boolean
  }
}

export function getReadingProgress(): ReadingProgress {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem("reading-progress")
  return stored ? JSON.parse(stored) : {}
}

export function setStoryComplete(moduleId: string | number, storyId: string): void {
  if (typeof window === "undefined") return
  const progress = getReadingProgress()
  const moduleKey = String(moduleId)
  if (!progress[moduleKey]) {
    progress[moduleKey] = {}
  }
  progress[moduleKey][storyId] = true
  localStorage.setItem("reading-progress", JSON.stringify(progress))
}

export function isStoryComplete(moduleId: string | number, storyId: string): boolean {
  const progress = getReadingProgress()
  const moduleKey = String(moduleId)
  return progress[moduleKey]?.[storyId] || false
}

export function getModuleReadingProgress(moduleId: string | number, totalStories: number): number {
  const progress = getReadingProgress()
  const moduleKey = String(moduleId)
  const moduleProgress = progress[moduleKey] || {}
  const completedCount = Object.values(moduleProgress).filter(Boolean).length
  return totalStories > 0 ? Math.round((completedCount / totalStories) * 100) : 0
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
